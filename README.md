# Image Token Creator
## Concept
There are so many digital images in the world.  
However, they are easily copied, so they cannot have a value.  
In order to solve that problem, this DApp make them unique by creating ImageToken (ERC721 token).

## Environment
- OS: macOS High Sierra version 10.13.6
- node: v10.11.0
- npm: 6.4.1
- truffle: v4.1.15
- solidity: v0.4.25

## How to Use
```
git clone <this repository>
cd <image-tokne-creator>
npm install
truffle compile
ganache-cli
truffle migrate
npm run dev
```
And then, input image name, image URL and push create button.
After confirm transaction using metamask, you can see the token balance increment.