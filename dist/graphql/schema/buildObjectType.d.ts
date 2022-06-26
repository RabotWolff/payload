import { GraphQLObjectType } from 'graphql';
import { Field } from '../../fields/config/types';
import { BaseFields } from '../../collections/graphql/types';
import { Payload } from '../..';
declare function buildObjectType(payload: Payload, name: string, fields: Field[], parentName: string, baseFields?: BaseFields): GraphQLObjectType;
export default buildObjectType;
