import { Component, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements AfterViewInit {
  ngAfterViewInit() {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.onload = () => {
      const dfMessenger = document.createElement('df-messenger');
      dfMessenger.setAttribute('intent', 'WELCOME');
      dfMessenger.setAttribute('chat-title', 'Julgian_BOT');
      dfMessenger.setAttribute('agent-id', '2d23ff09-2890-4108-b66b-28a4264d1069');
      dfMessenger.setAttribute('language-code', 'en');
      document.body.appendChild(dfMessenger);
    };
    document.head.appendChild(script);
  }
}
