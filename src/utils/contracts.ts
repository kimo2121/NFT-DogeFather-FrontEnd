import "@ethersproject/shims"
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { getContractObj } from ".";


export async function mint(chainId, provider, tokenURI, nft_price) {
    const nftContract = getContractObj('DogeFatherNFT', chainId, provider);
    try {
        const tx = await nftContract.mint(tokenURI, nft_price);
        await tx.wait(1);

        return tx.hash;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function buy(chainId, provider, tokenID, price) {
    console.log({ chainId, provider, tokenID, price });
    const nftContract = getContractObj('DogeFatherNFT', chainId, provider);
    try {
        const tx = await nftContract.buy(tokenID, {
            value: ethers.utils.parseEther(price)
        });
        await tx.wait(1);

        return tx.hash;
    } catch (e) {
        toast.error(e.message);
        console.log(e);
        return false;
    }
}

export async function updatePrice(chainId, provider, tokenID, nft_price) {
    const nftContract = getContractObj('DogeFatherNFT', chainId, provider);
    try {
        const tx = await nftContract.updatePrice(tokenID, ethers.utils.parseEther(nft_price));
        await tx.wait(1);

        return tx.hash;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function updateListingStatus(chainId, provider, tokenID, shouldBeListed) {
    const nftContract = getContractObj('DogeFatherNFT', chainId, provider);
    try {
        const tx = await nftContract.updateListingStatus(tokenID, shouldBeListed);
        await tx.wait(1);

        return tx.hash;
    } catch (e) {
        console.log(e);
        return false;

    }
}

export async function burn(chainId, provider, tokenID) {
    const nftContract = getContractObj('DogeFatherNFT', chainId, provider);
    try {
        const tx = await nftContract.burn(tokenID);
        await tx.wait(1);

        return tx.hash;
    } catch (e) {
        console.log(e);
        return false;

    }
}
