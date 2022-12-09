import { Block, KnownBlock } from "@slack/bolt";
import * as functions from "firebase-functions";
import { randomIcon } from "../../../lib/utils";

const config = functions.config();

const addAndAskElements = (searchWord: string, askChannelName: string) => {
  const elements = [
    {
      type: "button",
      text: {
        type: "plain_text",
        text: "용어 추가",
        emoji: true,
      },
      value: searchWord,
      action_id: "show_add_item_modal",
    },
  ];
  if (askChannelName) {
    elements.push({
      type: "button",
      text: {
        type: "plain_text",
        text: `#${askChannelName}으로 질문하기`,
        emoji: true,
      },
      value: searchWord,
      action_id: "ask",
    });
  }
  return elements;
};

type BlockArgs = {
  searchResult: SearchResult;
  searchWord: string;
  askChannelName: string;
};
export const searchResultBlock = ({
  searchResult,
  searchWord = "",
  askChannelName = "",
}: BlockArgs): (Block | KnownBlock)[] => {
  const searchItems = searchResult.searchItems;

  // perfect match case
  if (searchResult.isExactMatch) {
    const searchItem = searchItems[0];
    return [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "오케~. 이거야!",
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
            text: `결과를 편집하려면<https://docs.google.com/spreadsheets/d/${config.sheet.id}|여기>`,
          },
        ],
      },
      {
        type: "divider",
      },
    ];
  }

  // fuzzy match case
  if (searchResult.searchItems.length) {
    return [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "관련있을 것 같은 용어가 발견되었습니다!",
        },
      },
      {
        type: "actions",
        elements: [
          ...searchItems.slice(0, 4).map((item, i) => ({
            type: "button",
            text: {
              type: "plain_text",
              text: item.word,
              emoji: true,
            },
            value: item.word,
            action_id: `search_${i}`,
          })),
        ],
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "만약 새로운 용어의 경우는, 여기에서 대응해 주세요.",
        },
      },
      {
        type: "actions",
        elements: addAndAskElements(searchWord, askChannelName),
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `스프레드시트를 직접 열면<https://docs.google.com/spreadsheets/d/${config.sheet.id}|여기>`,
          },
        ],
      },
      {
        type: "divider",
      },
    ];
  }

  // unmatch case
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "죄송합니다 ... 찾지 못했습니다 ...",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "새로운 용어라고 생각하기 때문에 추가하십시오.",
      },
    },
    {
      type: "actions",
      elements: addAndAskElements(searchWord, askChannelName),
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `스프레드시트를 직접 열려면 <https://docs.google.com/spreadsheets/d/${config.sheet.id}|여기>`,
        },
      ],
    },
    {
      type: "divider",
    },
  ];
};
