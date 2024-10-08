import { ModelAttributes } from '../Model';
import { RelatedType, RelatedTypeJSON } from '../type/RelatedType';
import { Field, FieldJSON, FieldJSONValue, FieldValue } from './Field';
type RelationJSON = FieldJSON & {
    related_type: RelatedTypeJSON;
};
export declare class Relation extends Field {
    static type: string;
    private _relatedType;
    createTypeField(json: RelationJSON): Relation;
    getRelatedType(): RelatedType;
    deserialize(value: FieldJSONValue): FieldValue;
    serialize(value: FieldValue, fields?: ModelAttributes | true): FieldJSONValue;
    protected fallbackDefault(): FieldValue;
}
export {};
//# sourceMappingURL=Relation.d.ts.map