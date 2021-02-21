"use strict"
import {data} from "./data.min.js";
class App {
    constructor(data) {
        this.functions(data.functionalityData);
        this.defaultAnimations(data.animationData);
    };
    functions(data) {
        function activateAllFunctions(data) {
            function animationsForFunctions(animationOptions) {
                if (animationOptions.typeOfAnimation === "for common slider") return animationForCommonSlider(animationOptions);
                else if (animationOptions.typeOfAnimation === "for menu") return animationForMenu(animationOptions);
                function animationForCommonSlider(animationOptions) {
                    const animation = (slides, item1) => slides.forEach(slide => slide.classList.add(item1));
                    if (animationOptions.method === "open") return animation(animationOptions.slides, animationOptions.noteItems.noteClass1);
                    else if (animationOptions.method === "close") return animation(animationOptions.slides, animationOptions.noteItems.noteClass1);
                };
                function animationForMenu(animationOptions) {
                    const menuNav = document.querySelector(animationOptions.noteItems.menuNavigation);
                    const menuInfo = document.querySelector(animationOptions.noteItems.menuInfo);
                    return setTimeout(() => {
                        menuNav.classList.remove(animationOptions.noteForRemoveClass1);
                        menuNav.classList.add(animationOptions.noteForAddClass);
                        menuInfo.classList.remove(animationOptions.noteForRemoveClass2);
                        menuInfo.classList.add(animationOptions.noteForAddClass);
                        return setTimeout(() => {
                            const menuItems = [menuNav, menuInfo];
                            return menuItems.forEach(item => item.classList.remove(animationOptions.noteForAddClass));
                        }, 1600);
                    }, animationOptions.noteItems.ms);
                };
            };
            const function1 = () => {
                return function() {
                    const HTML = document.getElementsByTagName('html')[0];
                    const menuButton = document.querySelector(data.menu);
                    const menu = document.querySelector(data.menuItem);
                    const closeMenuButton = document.querySelector(data.closeMenu);
                    const functionProcess = ([item1, item2, item3, item4, item5, animationOptions]) => {
                        return item1.addEventListener("click", (event) => {
                            HTML.style.cssText = item5;
                            event.preventDefault();
                            item2.classList.remove(item3);
                            item2.classList.add(item4);
                            if (animationOptions.activateSpecialAnimation === true) {
                                return animationsForFunctions({
                                    typeOfAnimation: "for menu",
                                    noteForRemoveClass1: "animation-active-16",
                                    noteForRemoveClass2: "animation-active-17",
                                    noteForAddClass: "animation-not-active-1",
                                    noteItems: {
                                        menuNavigation: ".header-menu__navigation",
                                        menuInfo: ".header-menu__info",
                                        ms: 100
                                    }
                                });
                            };
                        });
                    };
                    const launchFunctionProcess = ([item1, item2, open, animationOptions]) => {
                        if (open === true) return functionProcess([item1, item2, "not-active", "active", `overflow-y: hidden`, animationOptions]);
                        else if (open === false) return functionProcess([item1, item2, "active", "not-active", `overflow-y: auto`, animationOptions]);
                    };
                    launchFunctionProcess([menuButton, menu, true, {activateSpecialAnimation: true}]);
                    launchFunctionProcess([closeMenuButton, menu, false, {activateSpecialAnimation: false}]);
                };
            };
            const function2 = (data) => {
                return function() {
                    const activateSlider = (object) => {
                        let index = 1;
                        let action;
                        const prevButton = document.querySelector(object.prev);
                        const nextButton = document.querySelector(object.next);
                        const slides = document.querySelectorAll(object.slides);
                        const slider = (x, action) => {
                            if (x < 1) index = slides.length;
                            else if (x > slides.length) index = 1;
                            slides.forEach(slide => slide.classList.add("not-active-1"));
                            slides[index - 1].classList.remove("not-active-1");
                            if (action === "open") functionProcess([true, slides, "open"]);
                            else if (action === "close") functionProcess([true, slides, "close"]);
                        };
                        slider(index);
                        const launchSliderWithSettings = ([item1, item2, action]) => item1.addEventListener("click", () => slider(index += item2, action));
                        launchSliderWithSettings([prevButton, -1, "close"]);
                        launchSliderWithSettings([nextButton, 1, "open"]);
                        const functionProcess = ([activateSpecialAnimation, slides, action]) => {
                            if (activateSpecialAnimation === true) {
                                return animationsForFunctions({
                                    typeOfAnimation: "for common slider",
                                    method: action,
                                    slides: slides,
                                    noteItems: {
                                        noteClass1: "default"
                                    }
                                });
                            };
                        };
                    };
                    const slideValues = Object.values(data);
                    slideValues.forEach(slideItems => {
                        const slideItemsValues = Object.values(slideItems);
                        const [prevBtn, nextBtn, slides] = slideItemsValues;
                        return activateSlider({
                            prev: prevBtn,
                            next: nextBtn,
                            slides: slides
                        });
                    });
                };
            };
            const function3 = (data) => {
                return function() {
                    const elementsForCountdown = [data.countdown1, data.countdown2, data.countdown3, data.countdown4];
                    const activateCountdown = (countItems) => {
                        const countdownItems = document.querySelectorAll(countItems);
                        let countdownDate = new Date(2022, 13, 10, 3, 0, 0).getTime();
                        const getCountdownTime = () => {
                            const now = new Date().getTime();
                            const difference = countdownDate - now;
                            const oneDay = 24 * 60 * 60 * 1000;
                            const oneHour = 60 * 60 * 1000;
                            const oneMinute = 60 * 1000;
                            let hours = Math.floor((difference % oneDay) / oneHour);
                            let minutes = Math.floor((difference % oneHour) / oneMinute);
                            let seconds = Math.floor((difference % oneMinute) / 1000);
                            const values = [hours, minutes, seconds];
                            countdownItems.forEach((item, index) => item.textContent = values[index]);
                            if (difference < 0) return clearInterval(countdown);
                        };
                        let countdown = setInterval(getCountdownTime, 1000);
                        return getCountdownTime();
                    };
                    return elementsForCountdown.forEach(element => activateCountdown(element));
                };
            };
            const allFunctions = {
                menuFunction: function1,
                commonSliderFunction: function2,
                countdownFunction: function3
            };
            const menu = allFunctions.menuFunction();
            const slider = (data) => {
                const activateSlider = allFunctions.commonSliderFunction(data);
                return activateSlider(data);
            };
            const countdown = allFunctions.countdownFunction(data); 
            //-------------------YOU MUST WRITE SLIDERS WITH COUNTER DONT FORGET---------------------
            menu();
            slider({
                productSlider: {
                    productSliderButtonPrev: data.productSliderButtonPrev,
                    productSliderButtonNext: data.productSliderButtonNext,
                    productSlides: data.productSlides
                },
                featuredSlider: {
                    featuredSliderButtonPrev: data.featuredSliderButtonPrev,
                    featuredSliderButtonNext: data.featuredSliderButtonNext,
                    featuredSlides: data.featuredSlides
                },
                blogSlider: {
                    blogSliderButtonPrev: data.blogSliderButtonPrev,
                    blogSliderButtonNext: data.blogSliderButtonNext,
                    blogSlides: data.blogSlides
                },
                mainSlider: {
                    mainSliderButtonPrev: data.mainSliderButtonPrev,
                    mainSliderButtonNext: data.mainSliderButtonNext,
                    mainSlides: data.mainSlides
                }
            });
            countdown();
            //---------------
        };
        return activateAllFunctions(data);
    };
    defaultAnimations(data) {
        function activateAllDefaultAnimations(data) {
            const animation1 = () => {
                const animation = () => {
                    const navItem1 = document.querySelector(data.headerElement__1);
                    const navItem2 = document.querySelector(data.headerElement__2);
                    const social = document.querySelector(data.bodyElement__1);
                    const sliderItem = document.querySelector(data.bodyElement__2);
                    const sliderInfo = document.querySelector(data.bodyElement__3);
                    const sliderButtons = document.querySelector(data.bodyElement__4);
                    const animationItems = [navItem1, navItem2, sliderItem, sliderInfo];
                    animationItems.forEach(item => item.classList.add("animation-not-active-1"));
                    setTimeout(() => {
                        social.classList.add("animation-not-active-1");
                        sliderButtons.classList.add("animation-not-active-1");
                    }, 800);
                    return setTimeout(() => {
                        animationItems.push(social, sliderButtons);
                        animationItems.forEach(item => {
                            item.removeAttribute("id");
                            item.classList.remove("animation-not-active-1");
                        });
                    }, 3100);
                };
                return animation();
            };
            const animationProcess = (options) => {
                if (options.anyNotes === true) {
                    options.itemsForNote.forEach(item => {
                        item.classList.remove(options.noteForRemoveClass);
                        item.classList.add(options.noteForAddClass);
                    });
                };
                return options.items.forEach(item => {
                    item.removeAttribute(options.attr);
                    item.classList.add(options.className);
                    return setTimeout(() => {
                        item.classList.remove(options.className);
                    }, options.ms);
                });
            };
            const activateAnimationProcess = ([options, animationItems, ms, animationItemsForNote]) => {
                if (options.anyNotes === true) {
                    return animationProcess({
                        items: animationItems,
                        attr: "id",
                        className: "animation-not-active-2",
                        ms: ms,
                        anyNotes: true,
                        itemsForNote: animationItemsForNote,
                        noteForRemoveClass: "animation-active-16",
                        noteForAddClass: "animation-not-active-3"
                    });
                } else if (options.anyNotes === false) {
                    return animationProcess({
                        items: animationItems,
                        attr: "id",
                        className: "animation-not-active-2",
                        ms: ms
                    });
                };   
            };
            const animation2 = () => {
                const animation = () => {
                    const products = document.querySelector(data.bodyElement__5);
                    const offerItem1 = document.querySelector(data.bodyElement__6);
                    const offerItem2 = document.querySelector(data.bodyElement__7);
                    const offerItem3 = document.querySelector(data.bodyElement__8);
                    const offerItem4 = document.querySelector(data.bodyElement__9);
                    const animationItems = [products, offerItem1, offerItem2, offerItem3, offerItem4];
                    return activateAnimationProcess([{anyNotes: false}, animationItems, 1500]);
                };
                return animation();
            };
            const animation3 = () => {
                const animation = () => {
                    const productTitle = document.querySelector(data.bodyElement__10);
                    const productInfo = document.querySelector(data.bodyElement__11);
                    const card1 = document.querySelector(data.bodyElement__12);
                    const card2 = document.querySelector(data.bodyElement__13);
                    const card3 = document.querySelector(data.bodyElement__14);
                    const productSliderButtonPrev = document.querySelector(data.bodyElement__15);
                    const productSliderButtonNext = document.querySelector(data.bodyElement__16);
                    const animationItems = [productTitle, productInfo, card1, card2, card3];
                    const animationItemsForNote = [productSliderButtonPrev, productSliderButtonNext];
                    return activateAnimationProcess([{anyNotes: true}, animationItems, 2000, animationItemsForNote]);
                };
                return animation();
            };
            const animation4 = () => {
                const animation = () => {
                    const featuredProductsTitle = document.querySelector(data.bodyElement__17);
                    const featuredProductsLinks = document.querySelector(data.bodyElement__18);
                    const card1 = document.querySelector(data.bodyElement__19);
                    const card2 = document.querySelector(data.bodyElement__20);
                    const card3 = document.querySelector(data.bodyElement__21);
                    const card4 = document.querySelector(data.bodyElement__22);
                    const featuredProductsSliderButtonPrev = document.querySelector(data.bodyElement__23);
                    const featuredProductsSliderButtonNext = document.querySelector(data.bodyElement__24);
                    const loadMoreButton = document.querySelector(data.bodyElement__25);
                    const animationItems = [featuredProductsTitle, featuredProductsLinks, card1, card2, card3, card4, loadMoreButton];
                    const animationItemsForNote = [featuredProductsSliderButtonPrev, featuredProductsSliderButtonNext];
                    return activateAnimationProcess([{anyNotes: true}, animationItems, 1500, animationItemsForNote]);
                };
                return animation();
            };
            const animation5 = () => {
                const animation = () => {
                    const newsletterOffer = document.querySelector(data.bodyElement__26);
                    const blogTitle = document.querySelector(data.bodyElement__27);
                    const blogItem1 = document.querySelector(data.bodyElement__28);
                    const blogItem2 = document.querySelector(data.bodyElement__29);
                    const blogSliderButtonPrev = document.querySelector(data.bodyElement__30);
                    const blogSliderButtonNext = document.querySelector(data.bodyElement__31);
                    const animationItems = [newsletterOffer, blogTitle, blogItem1, blogItem2];
                    const animationItemsForNote = [blogSliderButtonPrev, blogSliderButtonNext];
                    return activateAnimationProcess([{anyNotes: true}, animationItems, 2500, animationItemsForNote]);
                };
                return animation();
            };
            const animation6 = () => {
                const animation = () => {
                    const footerWrap = document.querySelector(data.footerElement__1);
                    footerWrap.classList.remove("animation-active-16");
                    footerWrap.classList.add("animation-not-active-3");
                    setTimeout(() => {
                        return footerWrap.classList.remove("animation-not-active-3");
                    }, 1200);
                };
                return animation();
            };
            const activateDesktopAnimations = () => {
                const activateAnimation = ([forcedActivate, animationPoint, animation]) => {
                    if (forcedActivate === true) return animation();
                    else if (forcedActivate === false) {
                        return window.addEventListener("scroll", () => {
                            if (scrollY >= animationPoint) {
                                animation();
                                return animation = () => false;
                            };
                        });
                    };
                };
                activateAnimation([true, 0, animation1]);
                activateAnimation([false, 550, animation2]);
                activateAnimation([false, 1750, animation3]);
                activateAnimation([false, 2350, animation4]);
                activateAnimation([false, 3050, animation5]);
                activateAnimation([false, 3800, animation6]);
            };
            const activateMobileAndTabletsAnimations = () => {
                const animationItemsForMobileAndTables = [animation1, animation2, animation3, animation4, animation5, animation6];
                const activateAnimation = (animation) => animation();
                animationItemsForMobileAndTables.forEach(animItem => activateAnimation(animItem));
            };
            const activateAnimationsForUserDevice = () => {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return activateMobileAndTabletsAnimations();
                else return activateDesktopAnimations();
            };
            return activateAnimationsForUserDevice();
        };
        return activateAllDefaultAnimations(data);
    };
};
const app = new App(data);