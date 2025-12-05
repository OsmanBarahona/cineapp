import { AnimationDefinition, Animation } from "@nativescript/core";

export function getFavoriteAnimation(view: any): AnimationDefinition {
    return {
        target: view,
        duration: 500,
        scale: { x: 1.2, y: 1.2 },
        rotate: 360,
        curve: "easeInOut"
    };
}

export function getSearchButtonAnimation(view: any): AnimationDefinition {
    return {
        target: view,
        duration: 300,
        rotate: 360,
        curve: "easeIn"
    };
}

export function getRefreshAnimation(view: any): AnimationDefinition {
    return {
        target: view,
        duration: 1000,
        rotate: 360,
        curve: "linear",
        iterations: Number.POSITIVE_INFINITY
    };
}