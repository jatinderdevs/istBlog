import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { settingsType } from "./settingsType";

export const schema = {
  types: [blockContentType, categoryType, postType, authorType, settingsType],
};
