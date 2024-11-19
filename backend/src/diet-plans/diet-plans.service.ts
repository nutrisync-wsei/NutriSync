import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  catchError,
  from,
  map,
  mergeMap,
  switchMap,
  tap,
  throwError
} from 'rxjs'
import { Base64 } from 'base64-string'
import { IDietPlanRequest, IDietPlanResponse } from './types'
import { RecipeDetailsDto } from './dtos/recipe-details.dto'
import { ImageInfoDto } from './dtos/image-info.dto'
import { IngredientDto } from './dtos/ingredient.dto'
import { InjectModel } from '@nestjs/mongoose'
import { DayOfEating, Meal } from './schemas/diet-plan.schema'
import { Model } from 'mongoose'
import { NutrientInfoDto } from './dtos/nutrient-info.dto'
import { mapIndexToWeekDay } from './utilts'
import { UserProfileService } from 'src/user-profile/user-profile.service'

@Injectable()
export class DietPlansService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private userProfileService: UserProfileService,
    @InjectModel(DayOfEating.name)
    private dayOfEatingModel: Model<DayOfEating>,
    @InjectModel(Meal.name)
    private mealModel: Model<Meal>
  ) {}

  generateDietPlan(userId: string) {
    const APP_ID = this.configService.get<string>('EDAMAM_APP_ID')
    const APP_KEY = this.configService.get<string>('EDAMAM_APP_KEY')
    const APP_USER = this.configService.get<string>('EDAMAM_APP_USER')
    const URL = `${this.configService.get<string>('EDAMAM_BASE_API_URL')}meal-planner/v1/${APP_ID}/select`
    const base64 = new Base64()
    const authorizationCredentials = `Basic ${base64.encode(`${APP_ID}:${APP_KEY}`)}`

    const numberOfDays = 7

    return from(this.userProfileService.findByUserId(userId)).pipe(
      switchMap(userProfile => {
        if (!userProfile) {
          throw new Error('User profile not found.')
        }

        const GOAL = userProfile.goal
        const TDEE = userProfile.TDEE

        const caloriesIntake =
          GOAL === 'lose_weight'
            ? TDEE - 300
            : GOAL === 'gain_weight'
              ? TDEE + 300
              : TDEE

        const maximumBreakfast = Math.floor(caloriesIntake * 0.3)
        const maximumLunch = Math.floor(caloriesIntake * 0.5)
        const maximumDinner = Math.floor(caloriesIntake * 0.4)

        const minProtein = Math.floor(userProfile.weight * 1.5)
        const maxProtein = Math.floor(userProfile.weight * 2)
        const minFat =
          userProfile.gender === 'female'
            ? userProfile.weight * 1
            : userProfile.weight * 0.7
        const maxFat =
          userProfile.gender === 'female'
            ? userProfile.weight * 1.3
            : userProfile.weight * 1

        const requestParams: IDietPlanRequest = {
          size: numberOfDays,
          plan: {
            accept: {
              all: [
                {
                  health: userProfile.dietaryRestrictions
                }
              ]
            },
            fit: {
              PROCNT: { min: minProtein, max: maxProtein },
              FAT: { min: Math.floor(minFat), max: Math.floor(maxFat) }
            },
            sections: {
              Breakfast: {
                accept: {
                  all: [
                    {
                      dish: [
                        'drinks',
                        'egg',
                        'biscuits and cookies',
                        'bread',
                        'pancake',
                        'cereals'
                      ]
                    },
                    {
                      meal: ['breakfast']
                    }
                  ]
                },
                fit: {
                  ENERC_KCAL: {
                    min: 250,
                    max: maximumBreakfast
                  }
                }
              },
              Lunch: {
                accept: {
                  all: [
                    {
                      dish: [
                        'main course',
                        'pasta',
                        'egg',
                        'salad',
                        'soup',
                        'sandwiches',
                        'pizza',
                        'seafood'
                      ]
                    },
                    {
                      meal: ['lunch/dinner']
                    }
                  ]
                },
                fit: {
                  ENERC_KCAL: {
                    min: 300,
                    max: maximumLunch
                  }
                }
              },
              Dinner: {
                accept: {
                  all: [
                    {
                      dish: [
                        'seafood',
                        'egg',
                        'salad',
                        'pizza',
                        'pasta',
                        'main course'
                      ]
                    },
                    {
                      meal: ['lunch/dinner']
                    }
                  ]
                },
                fit: {
                  ENERC_KCAL: {
                    min: 300,
                    max: maximumDinner
                  }
                }
              }
            }
          }
        }

        return this.httpService
          .post<IDietPlanResponse>(URL, requestParams, {
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
              Authorization: authorizationCredentials,
              'Edamam-Account-User': APP_USER
            }
          })
          .pipe(
            map(response => response.data),
            switchMap(data => {
              return from(data.selection).pipe(
                mergeMap((selection, index) => {
                  const dayOfWeek = mapIndexToWeekDay(index)
                  return from(Object.entries(selection.sections)).pipe(
                    mergeMap(([mealType, details]) => {
                      return this.lookupRecipe(details.assigned).pipe(
                        tap(recipeDetails => {
                          this.storeRecipeForUser(
                            userId,
                            mealType,
                            recipeDetails,
                            dayOfWeek
                          )
                        })
                      )
                    })
                  )
                })
              )
            }),
            map(() => `Diet Plan processing completed for user ${userId}.`)
          )
      }),
      catchError(error => {
        console.error('Error in generating diet plan:', error)
        return throwError(() => new Error('Failed to generate diet plan.'))
      })
    )
  }

  // TODO: Add response type
  lookupRecipe(recipeUri: string) {
    const APP_ID = this.configService.get<string>('EDAMAM_APP_ID')
    const APP_KEY = this.configService.get<string>('EDAMAM_APP_KEY')
    const APP_USER = this.configService.get<string>('EDAMAM_APP_USER')
    const TYPE = 'public'
    const URI_ENCODED = encodeURIComponent(recipeUri)
    const FIELDS = [
      'ingredients',
      'yield',
      'label',
      'dietLabels',
      'healthLabels',
      'totalNutrients',
      'uri',
      'image',
      'calories',
      'glycemixIndex'
    ]
    const fieldsParam = FIELDS.map(field => `field=${field}`).join('&')

    const URL = `${this.configService.get<string>('EDAMAM_BASE_API_URL')}recipes/v2/by-uri?type=${TYPE}&uri=${URI_ENCODED}&app_id=${APP_ID}&app_key=${APP_KEY}&${fieldsParam}`

    return this.httpService
      .get(URL, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Edamam-Account-User': APP_USER,
          'Accept-Language': 'en'
        }
      })
      .pipe(
        map(response =>
          response.data.hits.map((hit: { recipe: any }) => {
            const recipe = hit.recipe
            const proteins = recipe.totalNutrients['PROCNT']
            const fats = recipe.totalNutrients['FAT']
            const carbs = recipe.totalNutrients['CHOCDF']

            const nutrients = [
              new NutrientInfoDto(
                'Proteins',
                Math.round(proteins.quantity),
                proteins.unit
              ),
              new NutrientInfoDto('Fats', Math.round(fats.quantity), fats.unit),
              new NutrientInfoDto(
                'Carbs',
                Math.round(carbs.quantity),
                carbs.unit
              )
            ]

            const ingredients = recipe.ingredients.map(
              (ing: {
                text: string
                quantity: number
                measure: string
                food: string
                weight: number
                foodId: string
                image: string
              }) =>
                new IngredientDto(
                  ing.text,
                  +ing.quantity.toFixed(2),
                  ing.food,
                  ing.weight,
                  ing.foodId,
                  ing.image ? new ImageInfoDto(ing.image) : undefined,
                  ing.measure === '<unit>' ? null : ing.measure
                )
            )

            const imageInfo = recipe.image
              ? new ImageInfoDto(recipe.image)
              : undefined
            return new RecipeDetailsDto(
              recipe.label,
              imageInfo,
              recipe.uri,
              Math.round(recipe.calories),
              ingredients,
              nutrients,
              recipe.yield
            )
          })
        )
      )
  }

  getMeals(userId: string) {
    return this.dayOfEatingModel.find({ user: userId })
  }

  private async storeRecipeForUser(
    userId: string,
    mealType: string,
    recipeDetailsDto: RecipeDetailsDto,
    day: string
  ) {
    let dayOfEating = await this.dayOfEatingModel.findOne({
      user: userId,
      day
    })

    const meal = new this.mealModel({
      recipeDetails: {
        user: userId,
        label: `[${mealType}] ${recipeDetailsDto[0].label}`,
        image: recipeDetailsDto[0].image,
        url: recipeDetailsDto[0].url,
        calories: recipeDetailsDto[0].calories,
        ingredients: recipeDetailsDto[0].ingredients,
        nutrients: recipeDetailsDto[0].nutrients,
        servings: recipeDetailsDto[0].servings
      }
    })

    if (!dayOfEating) {
      dayOfEating = new this.dayOfEatingModel({
        user: userId,
        day,
        meals: [meal]
      })
    } else {
      dayOfEating.meals.push(meal)
    }

    try {
      await dayOfEating.save()
    } catch (error) {
      console.error('Error saving day of eating:', error)
    }
  }
}
