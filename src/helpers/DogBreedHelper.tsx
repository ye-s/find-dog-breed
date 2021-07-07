// Helper contains all breeds and method to build url for search
const dogBreeds = {
  affenpinscher: [],
  african: [],
  airedale: [],
  akita: [],
  appenzeller: [],
  australian: ["shepherd"],
  basenji: [],
  beagle: [],
  bluetick: [],
  borzoi: [],
  bouvier: [],
  boxer: [],
  brabancon: [],
  briard: [],
  buhund: ["norwegian"],
  bulldog: ["boston", "english", "french"],
  bullterrier: ["staffordshire"],
  cairn: [],
  cattledog: ["australian"],
  chihuahua: [],
  chow: [],
  clumber: [],
  cockapoo: [],
  collie: ["border"],
  coonhound: [],
  corgi: ["cardigan"],
  cotondetulear: [],
  dachshund: [],
  dalmatian: [],
  dane: ["great"],
  deerhound: ["scottish"],
  dhole: [],
  dingo: [],
  doberman: [],
  elkhound: ["norwegian"],
  entlebucher: [],
  eskimo: [],
  finnish: ["lapphund"],
  frise: ["bichon"],
  germanshepherd: [],
  greyhound: ["italian"],
  groenendael: [],
  havanese: [],
  hound: ["afghan", "basset", "blood", "english", "ibizan", "plott", "walker"],
  husky: [],
  keeshond: [],
  kelpie: [],
  komondor: [],
  kuvasz: [],
  labradoodle: [],
  labrador: [],
  leonberg: [],
  lhasa: [],
  malamute: [],
  malinois: [],
  maltese: [],
  mastiff: ["bull", "english", "tibetan"],
  mexicanhairless: [],
  mix: [],
  mountain: ["bernese", "swiss"],
  newfoundland: [],
  otterhound: [],
  ovcharka: ["caucasian"],
  papillon: [],
  pekinese: [],
  pembroke: [],
  pinscher: ["miniature"],
  pitbull: [],
  pointer: ["german", "germanlonghair"],
  pomeranian: [],
  poodle: ["miniature", "standard", "toy"],
  pug: [],
  puggle: [],
  pyrenees: [],
  redbone: [],
  retriever: ["chesapeake", "curly", "flatcoated", "golden"],
  ridgeback: ["rhodesian"],
  rottweiler: [],
  saluki: [],
  samoyed: [],
  schipperke: [],
  schnauzer: ["giant", "miniature"],
  setter: ["english", "gordon", "irish"],
  sheepdog: ["english", "shetland"],
  shiba: [],
  shihtzu: [],
  spaniel: [
    "blenheim",
    "brittany",
    "cocker",
    "irish",
    "japanese",
    "sussex",
    "welsh"
  ],
  springer: ["english"],
  stbernard: [],
  terrier: [
    "american",
    "australian",
    "bedlington",
    "border",
    "dandie",
    "fox",
    "irish",
    "kerryblue",
    "lakeland",
    "norfolk",
    "norwich",
    "patterdale",
    "russell",
    "scottish",
    "sealyham",
    "silky",
    "tibetan",
    "toy",
    "westhighland",
    "wheaten",
    "yorkshire"
  ],
  vizsla: [],
  waterdog: ["spanish"],
  weimaraner: [],
  whippet: [],
  wolfhound: ["irish"]
};

/* 
  Try to get breed and subbreed from model className
  Usually breed is last word, so: 
  * first we will check for it,
  * next we assume that first or next to last words could be subbreed.
  We have to compare each word (except last) from possibleBreed
  with subreed array for a match
*/
export const getDogBreedUrl = (possibleBreed: string) => {
  let tempArray = possibleBreed.split(" ");
  let tempArrayLength = tempArray.length;
  let breed: string = "";
  let subbreed: string = "";
  // Special cases handled manually
  if (possibleBreed === "german shepherd") {
    breed = "germanshepherd";
  }

  if (dogBreeds.hasOwnProperty(tempArray[tempArrayLength - 1])) {
    breed = tempArray[tempArrayLength - 1];
    let tempBreedArray = dogBreeds[tempArray[tempArrayLength - 1]];
    if (tempArray.length > 1 && tempBreedArray.length > 0) {
      for (let i = 0; i <= tempArray.length - 2; i++) {
        for (let j = 0; j <= tempBreedArray.length - 1; j++) {
          if (tempArray[i] === tempBreedArray[j]) {
            subbreed = tempBreedArray[j];
            break;
          }
        }
        if (subbreed) {
          break;
        }
      }
    }
  }

  if (!breed) {
    return;
  }

  return subbreed ? `${breed}/${subbreed}` : `${breed}`;
};
