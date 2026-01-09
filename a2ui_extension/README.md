# A2UI Extension Implementation

This is the Python implementation of the a2ui extension.

## Disclaimer

Important: The sample code provided is for demonstration purposes and illustrates the mechanics of the Agent-to-Agent (A2A) protocol. When building production applications, it is critical to treat any agent operating outside of your direct control as a potentially untrusted entity.

All data received from an external agent—including but not limited to its AgentCard, messages, artifacts, and task statuses—should be handled as untrusted input. For example, a malicious agent could provide an AgentCard containing crafted data in its fields (e.g., description, name, skills.description). If this data is used without sanitization to construct prompts for a Large Language Model (LLM), it could expose your application to prompt injection attacks.  Failure to properly validate and sanitize this data before use can introduce security vulnerabilities into your application.

Developers are responsible for implementing appropriate security measures, such as input validation and secure handling of credentials to protect their systems and users.


核心作用：为 A2A (Agent-to-Agent) 协议提供 agent 驱动 UI 的能力，允许 agent 通过 JSON 格式生成和控制用户界面。

主要功能：

数据封装 (create_a2ui_part)：将 A2UI JSON 数据封装成 A2A 协议的 Part，使用特定的 MIME 类型 application/json+a2ui 标识

数据识别 (is_a2ui_part, get_a2ui_datapart)：检测和提取 A2A 消息中的 A2UI 数据部分

扩展配置 (get_a2ui_agent_extension)：创建 A2UI 扩展的配置，支持可选的自定义内联 catalog 功能

扩展激活 (try_activate_a2ui_extension)：在请求上下文中检查并激活 A2UI 扩展

使用场景：agent 可以通过这个扩展返回结构化的 UI 描述（如表单、卡片、列表等），客户端根据这些描述动态渲染界面，而不需要预先定义所有可能的 UI 组件。