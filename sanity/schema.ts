import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemas/blockContent";
import post from "./schemas/post";
import document from "./schemas/document";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, document, blockContent],
};
