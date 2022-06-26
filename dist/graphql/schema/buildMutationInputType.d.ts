import { GraphQLInputObjectType, GraphQLScalarType } from 'graphql';
import { Field } from '../../fields/config/types';
import { Payload } from '../../index';
import { SanitizedCollectionConfig } from '../../collections/config/types';
export declare const getCollectionIDType: (config: SanitizedCollectionConfig) => GraphQLScalarType;
declare function buildMutationInputType(payload: Payload, name: string, fields: Field[], parentName: string, forceNullable?: boolean): GraphQLInputObjectType;
export default buildMutationInputType;
