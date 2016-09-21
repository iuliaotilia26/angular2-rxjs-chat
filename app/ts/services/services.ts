import {messagesServiceInjectables} from './MessagesService';
import {threadsServiceInjectables} from './ThreadsService';
import {userServiceInjectables} from './UserService';
import {weatherServiceInjectables} from "./WeatherService";
import {movieServiceInjectables} from "./MovieService";

export * from './MessagesService';
export * from './ThreadsService';
export * from './UserService';
export * from './WeatherService';
export * from './MovieService';

export var servicesInjectables: Array<any> = [
    messagesServiceInjectables,
    threadsServiceInjectables,
    userServiceInjectables,
    weatherServiceInjectables,
    movieServiceInjectables
];
