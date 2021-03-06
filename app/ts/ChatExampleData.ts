/* tslint:disable:max-line-length */
import {User, Thread, Message} from './models';
import {MessagesService, ThreadsService, UserService} from './services/services';
import * as moment from 'moment';

import {WeatherService} from './services/WeatherService';
import {MovieService} from './services/MovieService';



// the person using the app us Juliet
let me: User      = new User('Juliet', require('images/avatars/female-avatar-1.png'));
let ladycap: User = new User('Lady Capulet', require('images/avatars/female-avatar-2.png'));
let echo: User    = new User('Echo Bot', require('images/avatars/male-avatar-1.png'));
let rev: User     = new User('Reverse Bot', require('images/avatars/female-avatar-4.png'));
let wait: User    = new User('Waiting Bot', require('images/avatars/male-avatar-2.png'));
let capslock:User = new User('Caps Lock Bot',require('images/avatars/male-avatar-3.png'));
let searchweather:User =new User('Weather Search Bot',require('images/avatars/female-avatar-3.png'));
let searchmovie: User =new User('Movie Search Bot',require('images/avatars/male-avatar-4.png'));

let tLadycap: Thread = new Thread('tLadycap', ladycap.name, ladycap.avatarSrc);
let tEcho: Thread    = new Thread('tEcho', echo.name, echo.avatarSrc);
let tRev: Thread     = new Thread('tRev', rev.name, rev.avatarSrc);
let tWait: Thread    = new Thread('tWait', wait.name, wait.avatarSrc);
let tcapslock:Thread = new Thread('tcapslock',capslock.name,capslock.avatarSrc);
let tsearchweather:Thread = new Thread('tsearchweather',searchweather.name, searchweather.avatarSrc);
let tsearchmovie:Thread = new Thread ('tsearchmovie',searchmovie.name,searchmovie.avatarSrc);


let initialMessages: Array<Message> = [
    new Message({
        author: me,
        sentAt: moment().subtract(45, 'minutes').toDate(),
        text: 'Yet let me weep for such a feeling loss.',
        thread: tLadycap
    }),
    new Message({
        author: ladycap,
        sentAt: moment().subtract(20, 'minutes').toDate(),
        text: 'So shall you feel the loss, but not the friend which you weep for.',
        thread: tLadycap
    }),
    new Message({
        author: echo,
        sentAt: moment().subtract(1, 'minutes').toDate(),
        text: `I\'ll echo whatever you send me`,
        thread: tEcho
    }),
    new Message({
        author: rev,
        sentAt: moment().subtract(3, 'minutes').toDate(),
        text: `I\'ll reverse whatever you send me`,
        thread: tRev
    }),
    new Message({
        author: wait,
        sentAt: moment().subtract(4, 'minutes').toDate(),
        text: `I\'ll wait however many seconds you send to me before responding. Try sending '3'`,
        thread: tWait
    }),
    new Message({
        author:capslock,
        sentAt:moment().subtract(3, 'minutes').toDate(),
        text:`I\'ll caps lock whatever you send me`,
        thread:tcapslock
    }),
    new Message({
        author:searchweather,
        sentAt:moment().subtract(5, 'minutes').toDate(),
        text:`I\'ll search for you the weather of the city you are looking for`,
        thread:searchweather
    }),
    new Message({
        author:searchmovie,
        sentAt:moment().subtract(5, 'minutes').toDate(),
        text:`I\'ll search for you the movie you are looking for`,
        thread:searchmovie
    })
];

export class ChatExampleData {
    static init(messagesService: MessagesService,
                threadsService: ThreadsService,
                userService: UserService,
                weatherService: WeatherService,
                movieService: MovieService
    ): void {

        // TODO make `messages` hot
        messagesService.messages.subscribe(() => ({}));

        // set "Juliet" as the current user
        userService.setCurrentUser(me);

        // create the initial messages
        initialMessages.map( (message: Message) => messagesService.addMessage(message) );

        threadsService.setCurrentThread(tEcho);

        this.setupBots(messagesService, weatherService,movieService);
    }

    static setupBots(messagesService: MessagesService,
                     weatherService: WeatherService,
                     movieService: MovieService): void {

        // echo bot
        messagesService.messagesForThreadUser(tEcho, echo)
            .forEach( (message: Message): void => {
                    messagesService.addMessage(
                        new Message({
                            author: echo,
                            text: message.text,
                            thread: tEcho
                        })
                    );
                },
                null);


        // reverse bot
        messagesService.messagesForThreadUser(tRev, rev)
            .forEach( (message: Message): void => {
                    messagesService.addMessage(
                        new Message({
                            author: rev,
                            text: message.text.split('').reverse().join(''),
                            thread: tRev
                        })
                    );
                },
                null);

        //caps lock bot-Iulia's masterpiece
        messagesService.messagesForThreadUser(tcapslock, capslock)
            .forEach( (message: Message): void => {
                    messagesService.addMessage(
                        new Message({
                            author: capslock,
                            text: message.text.toUpperCase(),
                            thread: tcapslock
                        })
                    );
                },
                null);

        //movie search bot
        messagesService.messagesForThreadUser(tcapslock, capslock)
            .forEach( (message: Message): void => {
                    movieService.getMovie(message.text.toString())
                        .then(function (value) {
                            messagesService.addMessage(
                                new Message({
                                    author: searchmovie,
                                    text: value,
                                    thread: tsearchmovie
                                })
                            );
                        })
                        .catch(function (e) {
                            messagesService.addMessage(
                                new Message({
                                    author: searchmovie,
                                    text: 'Not display able to display informations for the requested movie',
                                    thread: tsearchmovie
                                })
                            );
                        })
                },
                null);

        //weather search bot
        messagesService.messagesForThreadUser(tcapslock, capslock)
            .forEach( (message: Message): void => {
                    weatherService.getWeather(message.text.toString())
                        .then(function (value) {
                            messagesService.addMessage(
                                new Message({
                                    author: searchweather,
                                    text: value,
                                    thread: tsearchweather
                                })
                            );
                        })
                        .catch(function (e) {
                            messagesService.addMessage(
                                new Message({
                                    author: searchweather,
                                    text: 'Not display able to display weather for your request',
                                    thread: tsearchweather
                                })
                            );
                        })
                },
                null);



        // waiting bot
        messagesService.messagesForThreadUser(tWait, wait)
            .forEach( (message: Message): void => {

                    let waitTime: number = parseInt(message.text, 10);
                    let reply: string;

                    if (isNaN(waitTime)) {
                        waitTime = 0;
                        reply = `I didn\'t understand ${message}. Try sending me a number`;
                    } else {
                        reply = `I waited ${waitTime} seconds to send you this.`;
                    }


                    setTimeout(
                        () => {
                            messagesService.addMessage(
                                new Message({
                                    author: wait,
                                    text: reply,
                                    thread: tWait
                                })
                            );
                        },
                        waitTime * 1000);
                },
                null);


    }
}
