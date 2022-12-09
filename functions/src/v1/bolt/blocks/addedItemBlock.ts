import { Block, KnownBlock } from "@slack/bolt";
import * as functions from "firebase-functions";
import { randomIcon } from "../../../lib/utils";

const config = functions.config();

export const addedItemBlock = (
  searchItem: SearchItem
): (Block | KnownBlock)[] => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "새로운 용어를 등록했습니다!",
      },
    },
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `${randomIcon()} ${searchItem.word}`,
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `\`\`\`${searchItem.description}\`\`\``,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `결과를 편집하려면<https://docs.google.com/spreadsheets/d/${config.sheet.id}|こちら>`,
        },
      ],
    },
    {
      type: "divider",
    },
  ];
};
