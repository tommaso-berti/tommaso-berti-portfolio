import {
    CustomBashIcon,
    CustomCssIcon,
    CustomGitIcon,
    CustomHtmlIcon,
    CustomJavascriptIcon,
    CustomjQueryIcon,
    CustomMongoDbIcon,
    CustomMuiIcon,
    CustomReactIcon,
    CustomReduxIcon,
    CustomNodeIcon,
    CustomGPTIcon,
    CustomVSCIcon,
    CustomWebstormIcon,
    CustomTailwindIcon,
    CustomNextJsIcon,
    CustomPostmanIcon,
} from "../../../icons/customIcons/index.js";

const projects = {
    codexpane: {
        id: "codexpane",
        introduction: {
            project_title: "CodexPane",
            description: [
                "During my side projects and while progressing through my Full Stack developer course on CodeCademy, I identified a recurring challenge, the need to frequently check code documentation, searching and switching constantly pages on the browser.",
                "First of all, I thought about using the most powerful tool of the last 5 years, ChatGPT, to search for documentation or example cases. However, every time the answer were different, and sometimes not accurate at all, even without considering coding best practices.",
                "Then, I tried to use tools and websites that aggregate code documentation, but most of them were either too basic or too complex to navigate, or simply not covering all the languages and frameworks I was using. Concluding, nothing that matched my needs, nor learning/coding style.",
                "So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .",
            ],
        },
        technologies: [
            {
                name: "React",
                category: "Frontend",
                level: 90,
                description: "UI dell’app, gestione stato e routing.",
                icon: CustomReactIcon,
            },
            {
                name: "Node.js",
                category: "Backend",
                level: 70,
                description: "API per recupero e caching della documentazione.",
                icon: CustomNodeIcon,
            },
            {
                name: "MongoDB",
                category: "Database",
                level: 60,
                description: "Storage delle risorse, snippet e cheat sheet.",
                icon: CustomMongoDbIcon,
            },
            {
                name: "Vite",
                category: "Tooling",
                level: 75,
                description: "Bundler e dev server per un DX veloce.",
                // tooling: qui ho scelto VSC come icona di contesto
                icon: CustomVSCIcon,
            },
        ],
        roadmap: [
            {
                title: "v1.0.0",
                content: "Content v1",
                preview: "",
            },
            {
                title: "v2.0.0",
                content: "Content v2",
                preview: "",
            },
            {
                title: "v3.0.0",
                content:
                    "So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .So I decided to create CodexPane, a fast and optimized browser web application that allows me (and, hopefully, other developers) to have quick access to a complete and refined code documentation with examples, cheatsheets, and interactive code playgrounds .",
                preview: "",
            },
        ],
    },
    portfolio: {},
};

export default projects;
