import { blockContentType } from "../schemaTypes/blockContentType";
import { categoryType } from "../schemaTypes/categoryType";
import { postType } from "../schemaTypes/postType";
import { authorType } from "../schemaTypes/authorType";
import { settingsType } from "../schemaTypes/settingsType";
import { blockContent } from "./blockContent";
import { guidePage } from "./guidePage";
import { guideSection } from "./objects/guideSection";
import { calloutBox } from "./objects/calloutBox";
import { quickReferenceSection } from "./objects/quickReferenceSection";
import { infoCard } from "./objects/infoCard";
import { twoColumnTable } from "./objects/twoColumnTable";
import { threeColumnTable } from "./objects/threeColumnTable";
import { bulletList } from "./objects/bulletList";
import { cityTabBlock } from "./objects/cityTabBlock";

export const schema = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    settingsType,
    blockContent,
    guidePage,
    guideSection,
    calloutBox,
    quickReferenceSection,
    infoCard,
    twoColumnTable,
    threeColumnTable,
    bulletList,
    cityTabBlock,
  ],
};
