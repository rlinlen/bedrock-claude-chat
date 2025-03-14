# 基於大型語言模型的代理（ReAct）

## 什麼是代理（ReAct）？

代理是一個高級人工智能系統，它以大型語言模型（LLM）作為其核心計算引擎。它將 LLM 的推理能力與規劃和工具使用等額外功能相結合，以自主執行複雜任務。代理可以分解複雜的查詢，生成逐步解決方案，並與外部工具或 API 交互以收集資訊或執行子任務。

此範例使用 [ReAct（推理 + 行動）](https://www.promptingguide.ai/techniques/react)方法實現代理。ReAct 使代理能夠通過在迭代反饋循環中結合推理和行動來解決複雜任務。代理反覆經歷三個關鍵步驟：思考、行動和觀察。它使用 LLM 分析當前情況，決定下一步要採取的行動，使用可用的工具或 API 執行該行動，並從觀察到的結果中學習。這個持續的過程使代理能夠適應動態環境，提高任務解決的準確性，並提供上下文感知的解決方案。

## 使用範例

使用 ReAct 的代理可以應用於各種場景，提供準確且高效的解決方案。

### 文字轉 SQL

使用者詢問「上一季度的總銷售額」。代理解讀此請求，將其轉換為 SQL 查詢，對資料庫執行查詢，並呈現結果。

### 財務預測

財務分析師需要預測下一季度的收入。代理蒐集相關資料，使用財務模型進行必要的計算，並生成詳細的預測報告，確保預測的準確性。

## 使用代理功能

要為您的自訂聊天機器人啟用代理功能，請按照以下步驟進行：

1. 導航至自訂機器人畫面中的代理區段。

2. 在代理區段中，您將找到可供代理使用的工具清單。預設情況下，所有工具都是禁用的。

3. 要啟用工具，只需切換所需工具旁邊的開關。一旦工具被啟用，代理將可以存取並在處理使用者查詢時使用該工具。

![](./imgs/agent_tools.png)

> [!Important]
> 請注意，在代理區段中啟用任何工具將自動將「知識」功能視為工具。這意味著大型語言模型（LLM）將自主決定是否使用「知識」來回答使用者查詢，並將其視為可用工具之一。

4. 預設提供「網際網路搜尋」工具。此工具允許代理從網際網路獲取資訊以回答使用者問題。

![](./imgs/agent1.png)
![](./imgs/agent2.png)

此工具依賴 [DuckDuckGo](https://duckduckgo.com/)，它有速率限制。適合概念驗證或演示目的，但如果您想在生產環境中使用，我們建議使用其他搜尋 API。

5. 您可以開發和添加自己的自訂工具以擴展代理的功能。有關創建和整合自訂工具的更多資訊，請參閱[如何開發自己的工具](#how-to-develop-your-own-tools)部分。

## 如何開發自己的工具

要為 Agent 開發自訂工具，請遵循以下指南：

- 建立一個繼承自 `AgentTool` 類別的新類別。雖然介面與 LangChain 相容，但此範例實作提供了自己的 `AgentTool` 類別，您應該從中繼承（[來源](../backend/app/agents/tools/agent_tool.py)）。

- 參考 [BMI 計算工具](../examples/agents/tools/bmi/bmi.py)的範例實作。此範例示範如何建立一個根據使用者輸入計算身體質量指數（BMI）的工具。

  - 工具上宣告的名稱和描述，在 LLM 考慮要使用哪個工具回應使用者問題時會被使用。換句話說，它們會被嵌入提示中調用 LLM。因此建議盡可能精確地描述。

- [可選] 開發自訂工具後，建議使用測試腳本（[範例](../examples/agents/tools/bmi/test_bmi.py)）驗證其功能。此腳本將幫助您確保工具按預期工作。

- 完成自訂工具的開發和測試後，將實作檔案移至 [backend/app/agents/tools/](../backend/app/agents/tools/) 目錄。然後開啟 [backend/app/agents/utils.py](../backend/app/agents/utils.py) 並編輯 `get_available_tools`，以便使用者可以選擇開發的工具。

- [可選] 為前端新增清晰的名稱和描述。此步驟是可選的，但如果不執行此步驟，將使用工具中宣告的工具名稱和描述。它們是為 LLM 準備的，而非使用者，因此建議新增專門的解釋以獲得更好的使用者體驗。

  - 編輯 i18n 檔案。開啟 [en/index.ts](../frontend/src/i18n/en/index.ts) 並在 `agent.tools` 中新增您自己的 `name` 和 `description`。
  - 同時編輯 `xx/index.ts`。其中 `xx` 代表您希望的國家代碼。

- 執行 `npx cdk deploy` 部署您的變更。這將使您的自訂工具在自訂機器人畫面中可用。

## 貢獻

**歡迎對工具儲存庫做出貢獻！**如果您開發了一個有用且實作良好的工具，請考慮透過提交 issue 或 pull request 將其貢獻給專案。