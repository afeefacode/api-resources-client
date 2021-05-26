import { apiResources } from './ApiResources'
import { FieldJSONValue } from './field/Field'
import { Relation } from './field/Relation'
import { Type } from './type/Type'

export type ModelJSON = {
  [key: string]: FieldJSONValue | undefined,
  type: string
  id?: string,
}

type ModelAttributes = Record<string, unknown>

type ModelConstructor = {
  new (): Model,
  type: string,
}

export class Model {
  [index: string]: unknown,

  public static type: string = 'Model'

  public id: string | null = null
  public type: string

  public static create (json: ModelJSON): Model {
    const ModelType = apiResources.getModel(json.type) || Model
    const model = new ModelType()
    model.deserialize(json)
    return model
  }

  public static createForNew (fields: ModelAttributes): Model {
    const ModelType = this
    const model = new ModelType()
    return model
  }

  constructor (type?: string) {
    this.type = type || (this.constructor as ModelConstructor).type
  }

  public deserialize (json: ModelJSON): void {
    const type: Type = apiResources.getType(json.type) as Type

    this.id = json.id || null
    this.type = type.name

    for (const [name, field] of Object.entries(type.getFields())) {
      if (json[name] !== undefined) {
        this[name] = field.deserialize(json[name]!)
      }

      if (field instanceof Relation && json['count_' + name] !== undefined) {
        this['count_' + name] = json['count_' + name]
      }
    }
  }

  public cloneForEdit (fields?: ModelAttributes): Model {
    const ModelType = apiResources.getModel(this.type) || Model
    const model = new ModelType()

    if (this.id) {
      model.id = this.id
    }

    const type: Type = apiResources.getType(this.type) as Type
    for (const name of Object.keys(type.getUpdateFields())) {
      if (!fields || fields[name]) {
        model[name] = this[name]
      }
    }

    return model
  }

  public serialize (fields?: ModelAttributes): ModelJSON {
    const json: ModelJSON = {
      type: this.type
    }

    if (this.id) {
      json.id = this.id
    }

    const type: Type = apiResources.getType(this.type) as Type
    for (const name of Object.keys(type.getUpdateFields())) {
      if (!fields || fields[name]) {
        json[name] = this[name] as FieldJSONValue
      }
    }

    return json
  }
}