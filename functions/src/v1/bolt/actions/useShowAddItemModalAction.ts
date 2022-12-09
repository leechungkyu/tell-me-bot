import { App, BlockButtonAction } from "@slack/bolt";
import { addItemModalBlock } from "../blocks/addItemModalBlock";
import { errorBlock } from "../blocks/errorBlock";

export const useShowAddItemModalAction = (app: App) => {
  app.action<BlockButtonAction>(
    "show_add_item_modal",
    async ({ ack, client, body, logger, action }) => {
      await ack();
      const channelId = body.channel!.id;
      // modalを表示
      try {
        // モーダルの表示
        await client.views.open({
          trigger_id: body.trigger_id,
          view: {
            type: "modal",
            // callback_id が view を特定するための識別子
            callback_id: "add_item_view",
            title: {
              type: "plain_text",
              text: "사전에 추가",
            },
            blocks: addItemModalBlock(action.value),
            private_metadata: JSON.stringify({
              channelId: channelId,
            }),
            submit: {
              type: "plain_text",
              text: "전송",
            },
          },
        });
      } catch (e) {
        logger.error(e);
        await client.chat.postMessage({
          channel: channelId,
          blocks: errorBlock(),
        });
      }
    }
  );
};
