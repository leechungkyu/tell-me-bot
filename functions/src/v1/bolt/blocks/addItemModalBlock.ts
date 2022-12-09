import { Block, KnownBlock } from "@slack/bolt";

export const addItemModalBlock = (
  searchWord: string
): (Block | KnownBlock)[] => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "부담없이 추가하십시오. 잘못되면 누군가가 수정해 줄 것.",
      },
    },
    {
      type: "input",
      block_id: "word",
      label: {
        type: "plain_text",
        text: "용어",
      },
      element: {
        type: "plain_text_input",
        action_id: "word_input",
        initial_value: searchWord,
      },
    },
    {
      type: "input",
      block_id: "description",
      label: {
        type: "plain_text",
        text: "설명",
      },
      element: {
        type: "plain_text_input",
        action_id: "description_input",
        multiline: true,
      },
    },
  ];
};
