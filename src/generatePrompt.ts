import {
    adjectives,
    artists,
    characters,
    colors,
    elements,
    improvers,
    landscapeShots,
    objects,
    places,
    portraitShots,
    prefixes,
    styles,
    suffixes,
} from "./constants";
import {rand, randList, randomize, RandomType} from "./utils";

export type SubjectType = "portrait" | "landscape";

type GeneratorOptions = {
    type?: SubjectType;
    characters?: string[];
    objects?: string[];
    places?: string[];
    artists?: string[];
    styles?: string[];
    colors?: string[];
    adjectives?: string[];
    elements?: string[];
    improvers?: string[];
    prefixes?: string[];
    suffixes?: string[];
};

const getSubject = (subjectType: SubjectType): string => {
    const subjectComps: string[] = [];

    const shot = randomize(RandomType.FREQUENT)
        ? `${rand(
              subjectType === "portrait"
                  ? portraitShots
                  : subjectType === "landscape"
                  ? landscapeShots
                  : [...portraitShots, ...landscapeShots],
          )} of`
        : "";
    subjectComps.push(shot);

    if (subjectType === "portrait") {
        const prefix = randomize(RandomType.FREQUENT) ? rand(prefixes) : "";
        subjectComps.push(prefix);

        const mainSubject = randomize(RandomType.UNCOMMON)
            ? rand(objects)
            : randomize(RandomType.COMMON)
            ? rand(characters)
            : `${rand(characters)} with ${rand(objects)}`;
        subjectComps.push(mainSubject);

        const element = randomize(RandomType.UNCOMMON) ? `of ${rand(elements)}` : "";
        subjectComps.push(element);

        const suffix = randomize(RandomType.FREQUENT) ? rand(suffixes) : "";
        subjectComps.push(suffix);
    } else if (subjectType === "landscape") {
        const place = rand(places);
        subjectComps.push(place);
    }

    return subjectComps.filter((comp) => !!comp).join(" ");
};

const getStyle = ({ includeArtist, includeStyle }: { includeArtist: boolean; includeStyle: boolean }): string => {
    return includeArtist && includeStyle
        ? `${rand(styles)} in ${rand(artists)} style`
        : includeArtist
        ? `${rand(artists)} style`
        : includeStyle
        ? rand(styles)
        : "";
};

const getAdjectives = (size: number): string[] => {
    return randList(adjectives, size);
};

const getImprovers = (size: number): string[] => {
    return randList(improvers, size);
};

const getColors = (size: number): string[] => {
    return randList(colors, size);
};

export const generatePrompt = (options?: GeneratorOptions): string => {
    const promptComponents = [
        getSubject(options?.type || rand(["portrait", "landscape"])),
        getStyle({ includeStyle: true, includeArtist: true }),
        ...getAdjectives(3),
        ...getImprovers(4),
        ...getColors(2),
    ];

    return promptComponents.join(", ");
};
