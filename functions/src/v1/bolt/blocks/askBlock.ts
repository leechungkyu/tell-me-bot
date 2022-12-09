import { Block, KnownBlock } from "@slack/bolt";

export const askBlock = (targetWord: string): (Block | KnownBlock)[] => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "이 용어를 들었지만 몰랐다 ~. 누군가 용어 설명을 추가 ~.",
      },
    },
    {
      type: "header",
      text: {
        type: "plain_text",
        text: targetWord,
        emoji: true,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "용어추가",
            emoji: true,
          },
          action_id: "show_add_item_modal",
        },
      ],
    },
    {
      type: "divider",
    },
  ];
};

export const askCompleteBlock = (
  targetWord: string,
  channelName = "질문채널"
): (Block | KnownBlock)[] => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `오케이 「${targetWord}」정보 #${channelName} 질문했습니다.`,
      },
    },
  ];
};
