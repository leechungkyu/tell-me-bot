import { Block, KnownBlock } from "@slack/bolt";

export const errorBlock = (): (Block | KnownBlock)[] => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "미안 .. 뭔가 오류 같은 ... Slack 관리자에게 문의하십시오.",
      },
    },
    {
      type: "divider",
    },
  ];
};
