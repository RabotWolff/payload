import { GraphQLEnumType } from 'graphql';
import { LocalizationConfig } from '../../config/types';
declare const buildLocaleInputType: (localization: LocalizationConfig) => GraphQLEnumType;
export default buildLocaleInputType;
