/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace SharedStructs {
  export type AuthorStruct = {
    addr: PromiseOrValue<string>;
    username: PromiseOrValue<BytesLike>;
    profilePicCID: PromiseOrValue<BytesLike>;
    reputation: PromiseOrValue<BigNumberish>;
  };

  export type AuthorStructOutput = [string, string, string, number] & {
    addr: string;
    username: string;
    profilePicCID: string;
    reputation: number;
  };
}

export interface StoryShareInterfaceInterface extends utils.Interface {
  functions: {
    "createAuthor(address,bytes32,bytes)": FunctionFragment;
    "createStory(bytes)": FunctionFragment;
    "getAuthor(address)": FunctionFragment;
    "setFeaturedStoryCID(bytes)": FunctionFragment;
    "updateAuthorRep(address,uint8)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createAuthor"
      | "createStory"
      | "getAuthor"
      | "setFeaturedStoryCID"
      | "updateAuthorRep"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createAuthor",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createStory",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAuthor",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setFeaturedStoryCID",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateAuthorRep",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "createAuthor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createStory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAuthor", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setFeaturedStoryCID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateAuthorRep",
    data: BytesLike
  ): Result;

  events: {};
}

export interface StoryShareInterface extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StoryShareInterfaceInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createAuthor(
      addr: PromiseOrValue<string>,
      username: PromiseOrValue<BytesLike>,
      profilePic: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createStory(
      _storyCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAuthor(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [SharedStructs.AuthorStructOutput] & {
        author: SharedStructs.AuthorStructOutput;
      }
    >;

    setFeaturedStoryCID(
      _storyCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateAuthorRep(
      addr: PromiseOrValue<string>,
      reputationChange: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  createAuthor(
    addr: PromiseOrValue<string>,
    username: PromiseOrValue<BytesLike>,
    profilePic: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createStory(
    _storyCID: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAuthor(
    addr: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<SharedStructs.AuthorStructOutput>;

  setFeaturedStoryCID(
    _storyCID: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateAuthorRep(
    addr: PromiseOrValue<string>,
    reputationChange: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createAuthor(
      addr: PromiseOrValue<string>,
      username: PromiseOrValue<BytesLike>,
      profilePic: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    createStory(
      _storyCID: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getAuthor(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<SharedStructs.AuthorStructOutput>;

    setFeaturedStoryCID(
      _storyCID: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateAuthorRep(
      addr: PromiseOrValue<string>,
      reputationChange: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    createAuthor(
      addr: PromiseOrValue<string>,
      username: PromiseOrValue<BytesLike>,
      profilePic: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createStory(
      _storyCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAuthor(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setFeaturedStoryCID(
      _storyCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateAuthorRep(
      addr: PromiseOrValue<string>,
      reputationChange: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createAuthor(
      addr: PromiseOrValue<string>,
      username: PromiseOrValue<BytesLike>,
      profilePic: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createStory(
      _storyCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAuthor(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setFeaturedStoryCID(
      _storyCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateAuthorRep(
      addr: PromiseOrValue<string>,
      reputationChange: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
