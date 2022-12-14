/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "LibraryStoryline",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LibraryStoryline__factory>;
    getContractFactory(
      name: "Story",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Story__factory>;
    getContractFactory(
      name: "StoryShare",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StoryShare__factory>;
    getContractFactory(
      name: "StoryShareInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StoryShareInterface__factory>;

    getContractAt(
      name: "LibraryStoryline",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LibraryStoryline>;
    getContractAt(
      name: "Story",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Story>;
    getContractAt(
      name: "StoryShare",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StoryShare>;
    getContractAt(
      name: "StoryShareInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StoryShareInterface>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
