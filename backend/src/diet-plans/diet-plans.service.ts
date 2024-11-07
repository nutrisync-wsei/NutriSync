import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { from, map, mergeMap, switchMap, tap } from 'rxjs'
import { Base64 } from 'base64-string'
import { IDietPlanRequest, IDietPlanResponse } from './types'
import { RecipeDetailsDto } from './dtos/recipe-details.dto'
import { ImageInfoDto } from './dtos/image-info.dto'
import { IngredientDto } from './dtos/ingredient.dto'
import { InjectModel } from '@nestjs/mongoose'
import { DayOfEating, Meal, RecipeDetails } from './schemas/diet-plan.schema'
import { Model } from 'mongoose'
import { NutrientInfoDto } from './dtos/nutrient-info.dto'
import { mapIndexToWeekDay } from './utilts'

@Injectable()
export class DietPlansService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectModel(RecipeDetails.name)
    private recipeDetailsModel: Model<RecipeDetails>,
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

    // TODO: If user can eat a lot of sugar?
    // TODO: how much calories?
    // TODO: Create different amount of sections
    const numberOfDays = 7
    const dietLabel = [
      'vegan',
      'vegetarian',
      'peanut-free',
      'tree-nut-free',
      'alcohol-free'
    ]

    const requestParams: IDietPlanRequest = {
      size: numberOfDays,
      plan: {
        accept: {
          all: [
            {
              health: dietLabel
            }
          ]
        },
        fit: {
          ENERC_KCAL: { min: 1000, max: 2000 },
          'SUGAR.added': { max: 20 }
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
              ENERC_KCAL: { min: 100, max: 600 }
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
              ENERC_KCAL: { min: 300, max: 900 }
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
              ENERC_KCAL: { min: 200, max: 900 }
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
        map(() => `Diet Plan processing completed for user ${userId}.`) // Informacja końcowa
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
              nutrients
            )
          })
        )
      )
  }

  // TODO: Return in readable format
  getMeals(userId: string) {
    return this.recipeDetailsModel.find({ user: userId })
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
        nutrients: recipeDetailsDto[0].nutrients
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
