# Chat Claude Bedrock (Nova)

![](https://img.shields.io/github/v/release/aws-samples/bedrock-claude-chat?style=flat-square)
![](https://img.shields.io/github/license/aws-samples/bedrock-claude-chat?style=flat-square)
![](https://img.shields.io/github/actions/workflow/status/aws-samples/bedrock-claude-chat/cdk.yml?style=flat-square)
[![](https://img.shields.io/badge/roadmap-view-blue)](https://github.com/aws-samples/bedrock-claude-chat/issues?q=is%3Aissue%20state%3Aopen%20label%3Aroadmap)

[English](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/README.md) | [日本語](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_ja-JP.md) | [한국어](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_ko-KR.md) | [中文](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_zh-CN.md) | [Français](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_fr-FR.md) | [Deutsch](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_de-DE.md) | [Español](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_es-ES.md) | [Italian](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_it-IT.md) | [Norsk](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_nb-NO.md) | [ไทย](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_th-TH.md) | [Bahasa Indonesia](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_id-ID.md) | [Bahasa Melayu](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_ms-MY.md) | [Tiếng Việt](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_vi-VN.md) | [Polski](https://github.com/aws-samples/bedrock-claude-chat/blob/v2/docs/README_pl-PL.md)

> [!Avertissement]  
> **Version 2 publiée. Pour mettre à jour, veuillez examiner attentivement le [guide de migration](./migration/V1_TO_V2_fr-FR.md).** Sans précaution, **LES BOTS DE LA VERSION 1 DEVIENDRONT INUTILISABLES.**

Un chatbot multilingue utilisant des modèles LLM fournis par [Amazon Bedrock](https://aws.amazon.com/bedrock/) pour l'IA générative.

### Regardez la présentation et l'installation sur YouTube

[![Présentation](https://img.youtube.com/vi/PDTGrHlaLCQ/hq1.jpg)](https://www.youtube.com/watch?v=PDTGrHlaLCQ)

### Conversation de base

![](./imgs/demo.gif)

### Personnalisation du bot

Ajoutez vos propres instructions et donnez des connaissances externes via une URL ou des fichiers (aussi appelé [RAG](https://aws.amazon.com/what-is/retrieval-augmented-generation/)). Le bot peut être partagé entre les utilisateurs de l'application. Le bot personnalisé peut également être publié en tant qu'API autonome (Voir les [détails](./PUBLISH_API_fr-FR.md)).

![](./imgs/bot_creation.png)
![](./imgs/bot_chat.png)
![](./imgs/bot_api_publish_screenshot3.png)

> [!Important]
> Pour des raisons de gouvernance, seuls les utilisateurs autorisés peuvent créer des bots personnalisés. Pour autoriser la création de bots personnalisés, l'utilisateur doit être membre du groupe appelé `CreatingBotAllowed`, qui peut être configuré via la console de gestion > Pools d'utilisateurs Amazon Cognito ou l'interface de ligne de commande AWS. Notez que l'ID du pool d'utilisateurs peut être consulté en accédant à CloudFormation > BedrockChatStack > Sorties > `AuthUserPoolIdxxxx`.

### Tableau de bord administrateur

<details>
<summary>Tableau de bord administrateur</summary>

Analysez l'utilisation pour chaque utilisateur / bot sur le tableau de bord administrateur. [détails](./ADMINISTRATOR_fr-FR.md)

![](./imgs/admin_bot_analytics.png)

</details>

### Agent alimenté par LLM

<details>
<summary>Agent alimenté par LLM</summary>

En utilisant la [fonctionnalité d'Agent](./AGENT_fr-FR.md), votre chatbot peut gérer automatiquement des tâches plus complexes. Par exemple, pour répondre à la question d'un utilisateur, l'Agent peut récupérer les informations nécessaires à partir d'outils externes ou décomposer la tâche en plusieurs étapes pour le traitement.

![](./imgs/agent1.png)
![](./imgs/agent2.png)

</details>

## 🚀 Déploiement super-facile

- Dans la région us-east-1, ouvrez [Accès au modèle Bedrock](https://us-east-1.console.aws.amazon.com/bedrock/home?region=us-east-1#/modelaccess) > `Gérer l'accès au modèle` > Cochez toutes les options de `Anthropic / Claude 3`, toutes les options de `Amazon / Nova`, `Amazon / Titan Text Embeddings V2` et `Cohere / Embed Multilingual`, puis `Enregistrer les modifications`.

<details>
<summary>Capture d'écran</summary>

![](./imgs/model_screenshot.png)

</details>

- Ouvrez [CloudShell](https://console.aws.amazon.com/cloudshell/home) dans la région où vous souhaitez déployer
- Effectuez le déploiement via les commandes suivantes. Si vous souhaitez spécifier la version à déployer ou appliquer des politiques de sécurité, veuillez spécifier les paramètres appropriés à partir des [Paramètres optionnels](#paramètres-optionnels).

```sh
git clone https://github.com/aws-samples/bedrock-claude-chat.git
cd bedrock-claude-chat
chmod +x bin.sh
./bin.sh
```

- On vous demandera si vous êtes un nouvel utilisateur ou si vous utilisez la version 2. Si vous n'êtes pas un utilisateur continuant depuis la version 0, veuillez entrer `y`.

### Paramètres optionnels

Vous pouvez spécifier les paramètres suivants lors du déploiement pour améliorer la sécurité et la personnalisation :

- **--disable-self-register** : Désactiver l'auto-inscription (par défaut : activé). Si cet indicateur est défini, vous devrez créer tous les utilisateurs sur Cognito et il ne permettra pas aux utilisateurs de s'inscrire eux-mêmes.
- **--enable-lambda-snapstart** : Activer [Lambda SnapStart](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html) (par défaut : désactivé). Si cet indicateur est défini, il améliore les temps de démarrage à froid des fonctions Lambda, offrant des temps de réponse plus rapides pour une meilleure expérience utilisateur.
- **--ipv4-ranges** : Liste séparée par des virgules des plages IPv4 autorisées. (par défaut : autoriser toutes les adresses IPv4)
- **--ipv6-ranges** : Liste séparée par des virgules des plages IPv6 autorisées. (par défaut : autoriser toutes les adresses IPv6)
- **--disable-ipv6** : Désactiver les connexions sur IPv6. (par défaut : activé)
- **--allowed-signup-email-domains** : Liste séparée par des virgules des domaines de courrier électronique autorisés pour l'inscription. (par défaut : aucune restriction de domaine)
- **--bedrock-region** : Définir la région où Bedrock est disponible. (par défaut : us-east-1)
- **--repo-url** : L'URL personnalisée du dépôt Bedrock Claude Chat à déployer, si fourché ou avec un contrôle de source personnalisé. (par défaut : https://github.com/aws-samples/bedrock-claude-chat.git)
- **--version** : La version de Bedrock Claude Chat à déployer. (par défaut : dernière version en développement)
- **--cdk-json-override** : Vous pouvez remplacer toutes les valeurs de contexte CDK pendant le déploiement à l'aide du bloc JSON de remplacement. Cela vous permet de modifier la configuration sans modifier directement le fichier cdk.json.

Exemple d'utilisation :

```bash
./bin.sh --cdk-json-override '{
  "context": {
    "selfSignUpEnabled": false,
    "enableLambdaSnapStart": true,
    "allowedIpV4AddressRanges": ["192.168.1.0/24"],
    "allowedSignUpEmailDomains": ["example.com"]
  }
}'
```

Le JSON de remplacement doit suivre la même structure que cdk.json. Vous pouvez remplacer toutes les valeurs de contexte, y compris :

- `selfSignUpEnabled`
- `enableLambdaSnapStart`
- `allowedIpV4AddressRanges`
- `allowedIpV6AddressRanges`
- `allowedSignUpEmailDomains`
- `bedrockRegion`
- `enableRagReplicas`
- `enableBedrockCrossRegionInference`
- Et autres valeurs de contexte définies dans cdk.json

> [!Note]
> Les valeurs de remplacement seront fusionnées avec la configuration cdk.json existante lors du déploiement dans la build AWS. Les valeurs spécifiées dans le remplacement prévaudront sur les valeurs dans cdk.json.

#### Exemple de commande avec des paramètres :

```sh
./bin.sh --disable-self-register --ipv4-ranges "192.0.2.0/25,192.0.2.128/25" --ipv6-ranges "2001:db8:1:2::/64,2001:db8:1:3::/64" --allowed-signup-email-domains "example.com,anotherexample.com" --bedrock-region "us-west-2" --version "v1.2.6"
```

- Après environ 35 minutes, vous obtiendrez la sortie suivante, à laquelle vous pouvez accéder depuis votre navigateur

```
URL du frontend : https://xxxxxxxxx.cloudfront.net
```

![](./imgs/signin.png)

L'écran d'inscription s'affichera comme indiqué ci-dessus, où vous pouvez enregistrer votre email et vous connecter.

> [!Important]
> Sans définir le paramètre optionnel, cette méthode de déploiement permet à quiconque connaissant l'URL de s'inscrire. Pour une utilisation en production, il est fortement recommandé d'ajouter des restrictions d'adresse IP et de désactiver l'inscription automatique pour atténuer les risques de sécurité (vous pouvez définir allowed-signup-email-domains pour restreindre les utilisateurs afin que seules les adresses email de votre domaine d'entreprise puissent s'inscrire). Utilisez à la fois ipv4-ranges et ipv6-ranges pour les restrictions d'adresse IP, et désactivez l'inscription automatique en utilisant disable-self-register lors de l'exécution de ./bin.

> [!TIP]
> Si l'`URL du frontend` n'apparaît pas ou si Bedrock Claude Chat ne fonctionne pas correctement, il peut s'agir d'un problème avec la dernière version. Dans ce cas, veuillez ajouter `--version "v1.2.6"` aux paramètres et réessayer le déploiement.

## Architecture

Il s'agit d'une architecture construite sur des services gérés par AWS, éliminant le besoin de gestion d'infrastructure. En utilisant Amazon Bedrock, il n'est pas nécessaire de communiquer avec des API extérieures à AWS. Cela permet de déployer des applications évolutives, fiables et sécurisées.

- [Amazon DynamoDB](https://aws.amazon.com/dynamodb/): Base de données NoSQL pour le stockage de l'historique des conversations
- [Amazon API Gateway](https://aws.amazon.com/api-gateway/) + [AWS Lambda](https://aws.amazon.com/lambda/): Point de terminaison API backend ([AWS Lambda Web Adapter](https://github.com/awslabs/aws-lambda-web-adapter), [FastAPI](https://fastapi.tiangolo.com/))
- [Amazon CloudFront](https://aws.amazon.com/cloudfront/) + [S3](https://aws.amazon.com/s3/): Diffusion de l'application frontend ([React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/))
- [AWS WAF](https://aws.amazon.com/waf/): Restriction d'adresses IP
- [Amazon Cognito](https://aws.amazon.com/cognito/): Authentification des utilisateurs
- [Amazon Bedrock](https://aws.amazon.com/bedrock/): Service géré pour utiliser des modèles fondamentaux via des API
- [Amazon Bedrock Knowledge Bases](https://aws.amazon.com/bedrock/knowledge-bases/): Fournit une interface gérée pour la Génération Améliorée par Récupération ([RAG](https://aws.amazon.com/what-is/retrieval-augmented-generation/)), offrant des services d'intégration et d'analyse de documents
- [Amazon EventBridge Pipes](https://aws.amazon.com/eventbridge/pipes/): Réception d'événements du flux DynamoDB et lancement de Step Functions pour intégrer des connaissances externes
- [AWS Step Functions](https://aws.amazon.com/step-functions/): Orchestration du pipeline d'ingestion pour intégrer des connaissances externes dans Bedrock Knowledge Bases
- [Amazon OpenSearch Serverless](https://aws.amazon.com/opensearch-service/features/serverless/): Sert de base de données backend pour Bedrock Knowledge Bases, fournissant des capacités de recherche en texte intégral et de recherche vectorielle, permettant une récupération précise des informations pertinentes
- [Amazon Athena](https://aws.amazon.com/athena/): Service de requête pour analyser le compartiment S3

![](./imgs/arch.png)

## Déployer avec CDK

Le déploiement Super-facile utilise [AWS CodeBuild](https://aws.amazon.com/codebuild/) pour effectuer le déploiement via CDK en interne. Cette section décrit la procédure de déploiement directement avec CDK.

- Assurez-vous d'avoir UNIX, Docker et un environnement d'exécution Node.js. Si ce n'est pas le cas, vous pouvez également utiliser [Cloud9](https://github.com/aws-samples/cloud9-setup-for-prototyping)

> [!Important]
> S'il n'y a pas suffisamment d'espace de stockage dans l'environnement local pendant le déploiement, l'amorçage CDK peut renvoyer une erreur. Si vous utilisez Cloud9, nous recommandons d'augmenter la taille du volume de l'instance avant de déployer.

- Clonez ce dépôt

```
git clone https://github.com/aws-samples/bedrock-claude-chat
```

- Installez les packages npm

```
cd bedrock-claude-chat
cd cdk
npm ci
```

- Si nécessaire, modifiez les entrées suivantes dans [cdk.json](./cdk/cdk.json) si besoin.

  - `bedrockRegion` : Région où Bedrock est disponible. **REMARQUE : Bedrock ne prend pas en charge toutes les régions pour le moment.**
  - `allowedIpV4AddressRanges`, `allowedIpV6AddressRanges` : Plage d'adresses IP autorisées.
  - `enableLambdaSnapStart` : Par défaut sur true. Mettez à false si vous déployez dans une [région qui ne prend pas en charge Lambda SnapStart pour les fonctions Python](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html#snapstart-supported-regions).

- Avant de déployer le CDK, vous devrez effectuer un Bootstrap une fois pour la région dans laquelle vous déployez.

```
npx cdk bootstrap
```

- Déployez cet exemple de projet

```
npx cdk deploy --require-approval never --all
```

- Vous obtiendrez une sortie similaire à la suivante. L'URL de l'application web sera affichée dans `BedrockChatStack.FrontendURL`, veuillez y accéder depuis votre navigateur.

```sh
 ✅  BedrockChatStack

✨  Temps de déploiement : 78.57s

Sorties :
BedrockChatStack.AuthUserPoolClientIdXXXXX = xxxxxxx
BedrockChatStack.AuthUserPoolIdXXXXXX = ap-northeast-1_XXXX
BedrockChatStack.BackendApiBackendApiUrlXXXXX = https://xxxxx.execute-api.ap-northeast-1.amazonaws.com
BedrockChatStack.FrontendURL = https://xxxxx.cloudfront.net
```

## Autres

### Configurer la prise en charge des modèles Mistral

Mettez à jour `enableMistral` à `true` dans [cdk.json](./cdk/cdk.json), et exécutez `npx cdk deploy`.

```json
...
  "enableMistral": true,
```

> [!Important]
> Ce projet se concentre sur les modèles Anthropic Claude, les modèles Mistral sont limités en support. Par exemple, les exemples de prompts sont basés sur les modèles Claude. Il s'agit d'une option uniquement Mistral, une fois que vous avez activé les modèles Mistral, vous ne pouvez utiliser que les modèles Mistral pour toutes les fonctionnalités de chat, PAS à la fois Claude et Mistral.

### Configurer la génération de texte par défaut

Les utilisateurs peuvent ajuster les [paramètres de génération de texte](https://docs.anthropic.com/claude/reference/complete_post) depuis l'écran de création de bot personnalisé. Si le bot n'est pas utilisé, les paramètres par défaut définis dans [config.py](./backend/app/config.py) seront utilisés.

```py
DEFAULT_GENERATION_CONFIG = {
    "max_tokens": 2000,
    "top_k": 250,
    "top_p": 0.999,
    "temperature": 0.6,
    "stop_sequences": ["Human: ", "Assistant: "],
}
```

### Supprimer les ressources

Si vous utilisez CLI et CDK, utilisez `npx cdk destroy`. Sinon, accédez à [CloudFormation](https://console.aws.amazon.com/cloudformation/home) et supprimez manuellement `BedrockChatStack` et `FrontendWafStack`. Notez que `FrontendWafStack` se trouve dans la région us-east-1.

### Paramètres de langue

Cet asset détecte automatiquement la langue à l'aide de [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector). Vous pouvez changer de langue depuis le menu de l'application. Vous pouvez également utiliser la chaîne de requête pour définir la langue comme indiqué ci-dessous.

> `https://example.com?lng=ja`

### Désactiver l'inscription automatique

Cet exemple a l'inscription automatique activée par défaut. Pour la désactiver, ouvrez [cdk.json](./cdk/cdk.json) et changez `selfSignUpEnabled` en `false`. Si vous configurez un [fournisseur d'identité externe](#fournisseur-didentité-externe), cette valeur sera ignorée et automatiquement désactivée.

### Restreindre les domaines pour les adresses e-mail d'inscription

Par défaut, cet exemple ne restreint pas les domaines pour les adresses e-mail d'inscription. Pour autoriser les inscriptions uniquement à partir de domaines spécifiques, ouvrez `cdk.json` et spécifiez les domaines sous forme de liste dans `allowedSignUpEmailDomains`.

```ts
"allowedSignUpEmailDomains": ["example.com"],
```

### Fournisseur d'identité externe

Cet exemple prend en charge les fournisseurs d'identité externes. Actuellement, nous supportons [Google](./idp/SET_UP_GOOGLE_fr-FR.md) et [fournisseur OIDC personnalisé](./idp/SET_UP_CUSTOM_OIDC_fr-FR.md).

### Ajouter automatiquement de nouveaux utilisateurs aux groupes

Cet exemple dispose des groupes suivants pour donner des autorisations aux utilisateurs :

- [`Admin`](./ADMINISTRATOR_fr-FR.md)
- [`CreatingBotAllowed`](#personnalisation-de-bot)
- [`PublishAllowed`](./PUBLISH_API_fr-FR.md)

Si vous voulez que les nouveaux utilisateurs rejoignent automatiquement des groupes, vous pouvez les spécifier dans [cdk.json](./cdk/cdk.json).

```json
"autoJoinUserGroups": ["CreatingBotAllowed"],
```

Par défaut, les nouveaux utilisateurs seront rejoints au groupe `CreatingBotAllowed`.

### Configurer les réplicas RAG

`enableRagReplicas` est une option dans [cdk.json](./cdk/cdk.json) qui contrôle les paramètres de réplica pour la base de données RAG, spécifiquement les bases de connaissances utilisant Amazon OpenSearch Serverless.

- **Défaut** : true
- **true** : Améliore la disponibilité en activant des réplicas supplémentaires, convenant aux environnements de production mais augmentant les coûts.
- **false** : Réduit les coûts en utilisant moins de réplicas, convenant au développement et aux tests.

Il s'agit d'un paramètre au niveau du compte/région, affectant l'ensemble de l'application plutôt que des bots individuels.

> [!Note]
> En date de juin 2024, Amazon OpenSearch Serverless prend en charge 0,5 OCU, réduisant les coûts d'entrée pour les charges de travail à petite échelle. Les déploiements de production peuvent commencer avec 2 OCUs, tandis que les charges de travail de dev/test peuvent utiliser 1 OCU. OpenSearch Serverless met à l'échelle automatiquement en fonction des demandes de charge de travail. Pour plus de détails, visitez [l'annonce](https://aws.amazon.com/jp/about-aws/whats-new/2024/06/amazon-opensearch-serverless-entry-cost-half-collection-types/).

### Inférence inter-régions

[L'inférence inter-régions](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html) permet à Amazon Bedrock d'acheminer dynamiquement les demandes d'inférence de modèle à travers plusieurs régions AWS, améliorant le débit et la résilience pendant les périodes de demande de pointe. Pour configurer, modifiez `cdk.json`.

```json
"enableBedrockCrossRegionInference": true
```

### Lambda SnapStart

[Lambda SnapStart](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html) améliore les temps de démarrage à froid pour les fonctions Lambda, offrant des temps de réponse plus rapides pour une meilleure expérience utilisateur. D'autre part, pour les fonctions Python, il y a des [frais en fonction de la taille du cache](https://aws.amazon.com/lambda/pricing/#SnapStart_Pricing) et [non disponible dans certaines régions](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html#snapstart-supported-regions) actuellement. Pour désactiver SnapStart, modifiez `cdk.json`.

```json
"enableLambdaSnapStart": false
```

### Configurer un domaine personnalisé

Vous pouvez configurer un domaine personnalisé pour la distribution CloudFront en définissant les paramètres suivants dans [cdk.json](./cdk/cdk.json) :

```json
{
  "alternateDomainName": "chat.example.com",
  "hostedZoneId": "Z0123456789ABCDEF"
}
```

- `alternateDomainName` : Le nom de domaine personnalisé pour votre application de chat (par exemple, chat.example.com)
- `hostedZoneId` : L'ID de votre zone hébergée Route 53 où les enregistrements de domaine seront créés

Lorsque ces paramètres sont fournis, le déploiement va automatiquement :

- Créer un certificat ACM avec validation DNS dans la région us-east-1
- Créer les enregistrements DNS nécessaires dans votre zone Route 53
- Configurer CloudFront pour utiliser votre domaine personnalisé

> [!Note]
> Le domaine doit être géré par Route 53 dans votre compte AWS. L'ID de la zone hébergée peut être trouvé dans la console Route 53.

### Développement local

Voir [DÉVELOPPEMENT LOCAL](./LOCAL_DEVELOPMENT_fr-FR.md).

### Contribution

Merci de considérer contribuer à ce dépôt ! Nous accueillons les corrections de bugs, les traductions de langue (i18n), les améliorations de fonctionnalités, les [outils d'agent](./docs/AGENT.md#comment-développer-vos-propres-outils), et autres améliorations.

Pour les améliorations de fonctionnalités et autres améliorations, **avant de créer une Pull Request, nous vous serions reconnaissants de créer un Issue de demande de fonctionnalité pour discuter de l'approche d'implémentation et des détails. Pour les corrections de bugs et les traductions de langue (i18n), procédez directement à la création d'une Pull Request.**

Veuillez également consulter les directives suivantes avant de contribuer :

- [Développement local](./LOCAL_DEVELOPMENT_fr-FR.md)
- [CONTRIBUTION](./CONTRIBUTING_fr-FR.md)

## Contacts

- [Takehiro Suzuki](https://github.com/statefb)
- [Yusuke Wada](https://github.com/wadabee)
- [Yukinobu Mine](https://github.com/Yukinobu-Mine)

## 🏆 Contributeurs Significatifs

- [k70suK3-k06a7ash1](https://github.com/k70suK3-k06a7ash1)
- [fsatsuki](https://github.com/fsatsuki)

## Contributeurs

[![contributeurs de bedrock claude chat](https://contrib.rocks/image?repo=aws-samples/bedrock-claude-chat&max=1000)](https://github.com/aws-samples/bedrock-claude-chat/graphs/contributors)

## Licence

Cette bibliothèque est sous licence MIT-0. Consultez [le fichier LICENSE](./LICENSE).