# 管理者機能

管理者機能は、カスタムボットの利用状況とユーザーの行動に関する重要な洞察を提供する重要なツールです。この機能がなければ、管理者にとって、どのカスタムボットが人気があり、なぜ人気があり、誰が使用しているかを理解することは困難になります。この情報は、指示プロンプトの最適化、RAGデータソースのカスタマイズ、潜在的なインフルエンサーとなりうる重度のユーザーの特定において極めて重要です。

## フィードバックループ

LLMの出力は常にユーザーの期待に応えられるわけではありません。時には、ユーザーのニーズを満たすことに失敗することがあります。LLMをビジネス運営や日常生活に効果的に「統合」するためには、フィードバックループの実装が不可欠です。Bedrock Claude Chatには、ユーザーが不満の原因を分析できるようにするフィードバック機能が備わっています。分析結果に基づいて、ユーザーはプロンプト、RAGデータソース、パラメータを適宜調整できます。

![](./imgs/feedback_loop.png)

![](./imgs/feedback-using-claude-chat.png)

データアナリストは、[Amazon Athena](https://aws.amazon.com/jp/athena/)を使用して会話ログにアクセスできます。[Jupyter Notebook](https://jupyter.org/)でデータを分析したい場合、[このノートブックの例](../examples/notebooks/feedback_analysis_example.ipynb)を参考にできます。

## 管理者ダッシュボード

現在、チャットボットとユーザーの使用状況に関する基本的な概要を提供しており、指定された期間内の各ボットおよびユーザーのデータを集計し、使用料金によって結果をソートすることに焦点を当てています。

![](./imgs/admin_bot_analytics.png)

> [!Note]
> ユーザー使用状況分析は近日中に提供予定です。

### 前提条件

管理者ユーザーは、管理コンソール > Amazon Cognito ユーザープール、またはAWS CLIを介して設定できる `Admin` と呼ばれるグループのメンバーである必要があります。ユーザープールIDは、CloudFormation > BedrockChatStack > 出力 > `AuthUserPoolIdxxxx` にアクセスすることで参照できます。

![](./imgs/group_membership_admin.png)

## メモ

- [アーキテクチャ](../README.md#architecture)で述べられているように、管理者機能はDynamoDBからエクスポートされたS3バケットを参照します。エクスポートは1時間ごとに実行されるため、最新の会話がすぐに反映されない可能性があることに注意してください。

- パブリックボットの使用状況では、指定された期間中に全く使用されていないボットはリストに表示されません。

- ユーザーの使用状況では、指定された期間中にシステムを全く使用していないユーザーはリストに表示されません。

## 会話データのダウンロード

Athenaを使用してSQL経由で会話ログを照会できます。ログをダウンロードするには、管理コンソールからAthenaクエリエディタを開き、SQLを実行します。以下は、ユースケースを分析するのに役立つクエリの例です。フィードバックは`MessageMap`属性で参照できます。

### Bot IDごとのクエリ

`bot-id`と`datehour`を編集します。`bot-id`はBotパブリッシュAPIからアクセスできるBot管理画面で確認できます。URLの末尾部分（`https://xxxx.cloudfront.net/admin/bot/<bot-id>`）に注意してください。

```sql
SELECT
    d.newimage.PK.S AS UserId,
    d.newimage.SK.S AS ConversationId,
    d.newimage.MessageMap.S AS MessageMap,
    d.newimage.TotalPrice.N AS TotalPrice,
    d.newimage.CreateTime.N AS CreateTime,
    d.newimage.LastMessageId.S AS LastMessageId,
    d.newimage.BotId.S AS BotId,
    d.datehour AS DateHour
FROM
    bedrockchatstack_usage_analysis.ddb_export d
WHERE
    d.newimage.BotId.S = '<bot-id>'
    AND d.datehour BETWEEN '<yyyy/mm/dd/hh>' AND '<yyyy/mm/dd/hh>'
    AND d.Keys.SK.S LIKE CONCAT(d.Keys.PK.S, '#CONV#%')
ORDER BY
    d.datehour DESC;
```

### ユーザーIDごとのクエリ

`user-id`と`datehour`を編集します。`user-id`はBot管理画面で確認できます。

> [!Note]
> ユーザー利用状況分析は近日公開予定です。

```sql
SELECT
    d.newimage.PK.S AS UserId,
    d.newimage.SK.S AS ConversationId,
    d.newimage.MessageMap.S AS MessageMap,
    d.newimage.TotalPrice.N AS TotalPrice,
    d.newimage.CreateTime.N AS CreateTime,
    d.newimage.LastMessageId.S AS LastMessageId,
    d.newimage.BotId.S AS BotId,
    d.datehour AS DateHour
FROM
    bedrockchatstack_usage_analysis.ddb_export d
WHERE
    d.newimage.PK.S = '<user-id>'
    AND d.datehour BETWEEN '<yyyy/mm/dd/hh>' AND '<yyyy/mm/dd/hh>'
    AND d.Keys.SK.S LIKE CONCAT(d.Keys.PK.S, '#CONV#%')
ORDER BY
    d.datehour DESC;
```