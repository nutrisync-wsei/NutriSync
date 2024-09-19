import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types, Document } from 'mongoose'
import { User } from 'src/auth/schemas/user.schema'

@Schema()
export class UserProfile extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User | Types.ObjectId

  @Prop({ required: true })
  age: number

  @Prop({ required: true })
  height: number

  @Prop({ required: true })
  weight: number

  @Prop({ required: true })
  activityLevel: string

  @Prop({ required: true })
  goal: string

  @Prop({ type: [String] })
  dietaryRestrictions: string[]

  @Prop({ type: [String] })
  medicalConditions: string[]
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile)
