# chat-ui

This project is a fork of `vue-beautiful-chat`, as I needed to change and refactor most of the code, I decided to create a separate project for it.

Go to [FAQ](#faq) ⬇️

## Features

- Customizeable
- Backend agnostic
- Free

## Table of Contents
- [Installation](#installation)
- [Example](#example)
- [Components](#components)

## Installation

```
$ yarn add @doublepi/chat-ui
```

## Example
```javascript
import ChatUI from '@doublepi/chat-ui'
Vue.use(ChatUI)
```

```html
<template>
  <div>
    <chat-ui
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :isOpen="isChatOpen"
      :icons="icons"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      @onType="handleOnType"
      @edit="editMessage" />
  </div>
</template>
```
```javascript
import FileIcon from 'chat-ui/src/assets/file.svg'

export default {
  name: 'app',
  data() {
    return {
      icons:{
        file:{
          img: FileIcon,
          name: 'default',
        },
      },
      participants: [
        {
          id: 'user1',
          name: 'Matteo',
          imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
        },
        {
          id: 'user2',
          name: 'Support',
          imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: [
          { type: 'text', author: `me`, data: { text: `Say yes!` } },
          { type: 'text', author: `user1`, data: { text: `No.` } }
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        replyMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
    }
  },
  methods: {
    sendMessage (text) {
      if (text.length > 0) {
        this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      this.messageList = [ ...this.messageList, message ]
    },
    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType () {
      console.log('Emit typing event')
    },
    editMessage(message){
      const m = this.messageList.find(m=>m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    }
  }
}
```

For more detailed examples see the demo folder.

## Components

#### Props

| prop                | type              | description                                                                                             |
| ------------------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
| *participants       | [agentProfile]    | Represents your product or service's customer service agents. Fields for each agent: id, name, imageUrl |
| *onMessageWasSent   | function(message) | Called when a message a message is sent with a message object as an argument.                           |
| messageList         | [message]         | An array of message objects to be rendered as a conversation.                                           |
| showTypingIndicator | String            | A string that can be set to a user's participant.id to show `typing` indicator for them                 |
| showHeader          | Boolean           | A bool indicating whether or not to show the header of chatwindow                                       |
| colors              | Object            | An object containing the specs of the colors used to paint the component. [See here](#faq)              |

#### Events

| event  | params    | description                                |
| ------ | --------- | ------------------------------------------ |
| onType | undefined | Fires when user types on the message input |
| edit   | `message` | Fires after user edited message            |

#### Slots

##### header

Replacing default header.

``` html
<template v-slot:header>
  🤔 Good chat between {{participants.map(m=>m.name).join(' & ')}}
</template>
```

##### user-avatar

Replacing user avatar.
Params: `message`, `user`

``` html
<template v-slot:user-avatar="{ message, user }">
  <div style="border-radius:50%; color: pink; font-size: 15px; line-height:25px; text-align:center;background: tomato; width: 25px !important; height: 25px !important; min-width: 30px;min-height: 30px;margin: 5px; font-weight:bold" v-if="message.type === 'text' && user && user.name">
    {{user.name.toUpperCase()[0]}}
  </div>
</template>
```

##### text-message-body

Change markdown for text message.
Params: `message`

``` html
<template v-slot:text-message-body="{ message }">
  <small style="background:red" v-if="message.meta">
    {{message.meta}}
  </small>
  {{message.text}}
</template>
```

##### system-message-body

Change markdown for system message.
Params: `message`

``` html
<template v-slot:system-message-body="{ message }">
  [System]: {{message.text}}
</template>
```

### Message Objects

Message objects are rendered differently depending on their type. Currently, only text, emoji and file types are supported. Each message object has an `author` field which can have the value 'me' or the id of the corresponding agent.

``` javascript
{
  author: 'support',
  type: 'text',
  id: 1, // or text '1'
  isEdited: false,
  data: {
    text: 'some text',
    meta: '06-16-2019 12:43'
  },
  reply: 1 // ID of the message being replied
}

{
  author: 'giuliandrimba',
  type: 'emoji',
  id: 1, // or text '1'
  isEdited: false,
  data: {
    code: 'someCode'
  }
}

{
  author: 'giuliandrimba',
  type: 'file',
  id: 1, // or text '1'
  isEdited: false,
  data: {
    file: {
      name: 'file.mp3',
      url: 'https:123.rf/file.mp3'
    }
  }
}

```


#### Quick replies

When sending a message, you can provide a set of sentences that will be displayed in the user chat as quick replies. Adding in the message object a `suggestions` field with the value an array of strings will trigger this functionality

```javascript
{
  author: 'support',
  type: 'text',
  id: 1, // or text '1'
  data: {
    text: 'some text',
    meta: '06-16-2019 12:43'
  },
  suggestions: ['some quick reply', ..., 'another one']
}
```

### FAQ

<details><summary>How to get the demo working?</summary>
<p>

```
git clone git@github.com:doublepi/chat-ui.git
cd chat-ui
yarn install  # this installs the package dependencies
yarn watch  # this watches files to continuously compile them
```

Open a new shell in the same folder

```
cd demo
yarn install # this installs the demo dependencies
yarn dev # this starts the dev server at http://localhost:8080
```

</p>
</details>

<details><summary>How can I add a feature or fix a bug?</summary>
<p>

- Fork the repository
- Fix/add your changes
- `yarn build` on the root to have the library compiled with your latest changes
- create a pull request describing what you did
- discuss the changes with the maintainer
- boom! your changes are added to the main repo
- a release is created almost once per week 😉

</p>
</details>

<details><summary>How can I customize the colors?</summary>
<p>

- When initializing the component, pass an object specifying the colors used:

```javascript

let redColors = {
  header: {
    bg: '#D32F2F',
    text: '#fff'
  },
  messageList: {
    bg: '#fff'
  },
  sentMessage: {
    bg: '#F44336',
    text: '#fff'
  },
  replyMessage: {
    bg: '#F44336',
    text: '#fff'
  },
  receivedMessage: {
    bg: '#eaeaea',
    text: '#222222'
  },
  userInput: {
    bg: '#fff',
    text: '#212121'
  }
}

<chat-ui
      ...
      :colors="redColors" />
```

This is the red variant. Please check [this file](https://github.com/doublepi/chat-ui/tree/master/demo/src/colors.js) for the list of variants shown in the demo page online.

Please note that you need to pass an Object containing each one of the color properties otherwise the validation will fail.

</p>
</details>
</details>
