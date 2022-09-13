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
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace SharedStructs {
  export type ContributionStruct = {
    authorAddr: PromiseOrValue<string>;
    cid: PromiseOrValue<BytesLike>;
    prevCID: PromiseOrValue<BytesLike>;
    nextCIDs: PromiseOrValue<BytesLike>[];
    contribCount: PromiseOrValue<BigNumberish>;
    state: PromiseOrValue<BigNumberish>;
    leader: PromiseOrValue<string>;
  };

  export type ContributionStructOutput = [
    string,
    string,
    string,
    string[],
    number,
    number,
    string
  ] & {
    authorAddr: string;
    cid: string;
    prevCID: string;
    nextCIDs: string[];
    contribCount: number;
    state: number;
    leader: string;
  };

  export type StoryDetailsStruct = {
    cid: PromiseOrValue<BytesLike>;
    title: PromiseOrValue<string>;
    summary: PromiseOrValue<string>;
    genre: PromiseOrValue<BytesLike>;
  };

  export type StoryDetailsStructOutput = [string, string, string, string] & {
    cid: string;
    title: string;
    summary: string;
    genre: string;
  };
}

export interface StoryInterface extends utils.Interface {
  functions: {
    "authorContribCounts(address)": FunctionFragment;
    "contribute(bytes,bytes)": FunctionFragment;
    "contributions(bytes)": FunctionFragment;
    "draftVotes(bytes,uint256)": FunctionFragment;
    "getContribution(bytes)": FunctionFragment;
    "getDraftVotes(bytes)": FunctionFragment;
    "getStoryDetails()": FunctionFragment;
    "initialContribution()": FunctionFragment;
    "publishDraft(bytes,bytes)": FunctionFragment;
    "publishVotes(bytes,uint256)": FunctionFragment;
    "storyDetails()": FunctionFragment;
    "uniqueAuthors(bytes,uint256)": FunctionFragment;
    "uniqueVoters(address)": FunctionFragment;
    "voteToDraft(bytes)": FunctionFragment;
    "voteToPublish(bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "authorContribCounts"
      | "contribute"
      | "contributions"
      | "draftVotes"
      | "getContribution"
      | "getDraftVotes"
      | "getStoryDetails"
      | "initialContribution"
      | "publishDraft"
      | "publishVotes"
      | "storyDetails"
      | "uniqueAuthors"
      | "uniqueVoters"
      | "voteToDraft"
      | "voteToPublish"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "authorContribCounts",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "contribute",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "contributions",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "draftVotes",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getContribution",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getDraftVotes",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getStoryDetails",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialContribution",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "publishDraft",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "publishVotes",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "storyDetails",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "uniqueAuthors",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "uniqueVoters",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "voteToDraft",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "voteToPublish",
    values: [PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "authorContribCounts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "contribute", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "contributions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "draftVotes", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getContribution",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDraftVotes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStoryDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initialContribution",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "publishDraft",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "publishVotes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "storyDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "uniqueAuthors",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "uniqueVoters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "voteToDraft",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "voteToPublish",
    data: BytesLike
  ): Result;

  events: {
    "storylineEvent(tuple[])": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "storylineEvent"): EventFragment;
}

export interface storylineEventEventObject {
  storyline: SharedStructs.ContributionStructOutput[];
}
export type storylineEventEvent = TypedEvent<
  [SharedStructs.ContributionStructOutput[]],
  storylineEventEventObject
>;

export type storylineEventEventFilter = TypedEventFilter<storylineEventEvent>;

export interface Story extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StoryInterface;

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
    authorContribCounts(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    contribute(
      cid: PromiseOrValue<BytesLike>,
      prevCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    contributions(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, number, number, string] & {
        authorAddr: string;
        cid: string;
        prevCID: string;
        contribCount: number;
        state: number;
        leader: string;
      }
    >;

    draftVotes(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getContribution(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [SharedStructs.ContributionStructOutput] & {
        contribution: SharedStructs.ContributionStructOutput;
      }
    >;

    getDraftVotes(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string[]] & { draftVoters: string[] }>;

    getStoryDetails(
      overrides?: CallOverrides
    ): Promise<[SharedStructs.StoryDetailsStructOutput]>;

    initialContribution(
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, number, number, string] & {
        authorAddr: string;
        cid: string;
        prevCID: string;
        contribCount: number;
        state: number;
        leader: string;
      }
    >;

    publishDraft(
      _prevCID: PromiseOrValue<BytesLike>,
      _finalDraftCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    publishVotes(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    storyDetails(
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string] & {
        cid: string;
        title: string;
        summary: string;
        genre: string;
      }
    >;

    uniqueAuthors(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    uniqueVoters(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    voteToDraft(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    voteToPublish(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  authorContribCounts(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<number>;

  contribute(
    cid: PromiseOrValue<BytesLike>,
    prevCID: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  contributions(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, number, number, string] & {
      authorAddr: string;
      cid: string;
      prevCID: string;
      contribCount: number;
      state: number;
      leader: string;
    }
  >;

  draftVotes(
    arg0: PromiseOrValue<BytesLike>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getContribution(
    _cid: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<SharedStructs.ContributionStructOutput>;

  getDraftVotes(
    _cid: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getStoryDetails(
    overrides?: CallOverrides
  ): Promise<SharedStructs.StoryDetailsStructOutput>;

  initialContribution(
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, number, number, string] & {
      authorAddr: string;
      cid: string;
      prevCID: string;
      contribCount: number;
      state: number;
      leader: string;
    }
  >;

  publishDraft(
    _prevCID: PromiseOrValue<BytesLike>,
    _finalDraftCID: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  publishVotes(
    arg0: PromiseOrValue<BytesLike>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  storyDetails(
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, string] & {
      cid: string;
      title: string;
      summary: string;
      genre: string;
    }
  >;

  uniqueAuthors(
    arg0: PromiseOrValue<BytesLike>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  uniqueVoters(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  voteToDraft(
    _cid: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  voteToPublish(
    _cid: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    authorContribCounts(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<number>;

    contribute(
      cid: PromiseOrValue<BytesLike>,
      prevCID: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<SharedStructs.ContributionStructOutput>;

    contributions(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, number, number, string] & {
        authorAddr: string;
        cid: string;
        prevCID: string;
        contribCount: number;
        state: number;
        leader: string;
      }
    >;

    draftVotes(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getContribution(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<SharedStructs.ContributionStructOutput>;

    getDraftVotes(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getStoryDetails(
      overrides?: CallOverrides
    ): Promise<SharedStructs.StoryDetailsStructOutput>;

    initialContribution(
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, number, number, string] & {
        authorAddr: string;
        cid: string;
        prevCID: string;
        contribCount: number;
        state: number;
        leader: string;
      }
    >;

    publishDraft(
      _prevCID: PromiseOrValue<BytesLike>,
      _finalDraftCID: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    publishVotes(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    storyDetails(
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string] & {
        cid: string;
        title: string;
        summary: string;
        genre: string;
      }
    >;

    uniqueAuthors(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    uniqueVoters(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    voteToDraft(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    voteToPublish(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "storylineEvent(tuple[])"(storyline?: null): storylineEventEventFilter;
    storylineEvent(storyline?: null): storylineEventEventFilter;
  };

  estimateGas: {
    authorContribCounts(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    contribute(
      cid: PromiseOrValue<BytesLike>,
      prevCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    contributions(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    draftVotes(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getContribution(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getDraftVotes(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getStoryDetails(overrides?: CallOverrides): Promise<BigNumber>;

    initialContribution(overrides?: CallOverrides): Promise<BigNumber>;

    publishDraft(
      _prevCID: PromiseOrValue<BytesLike>,
      _finalDraftCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    publishVotes(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    storyDetails(overrides?: CallOverrides): Promise<BigNumber>;

    uniqueAuthors(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    uniqueVoters(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    voteToDraft(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    voteToPublish(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    authorContribCounts(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    contribute(
      cid: PromiseOrValue<BytesLike>,
      prevCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    contributions(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    draftVotes(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getContribution(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getDraftVotes(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getStoryDetails(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialContribution(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    publishDraft(
      _prevCID: PromiseOrValue<BytesLike>,
      _finalDraftCID: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    publishVotes(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    storyDetails(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    uniqueAuthors(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    uniqueVoters(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    voteToDraft(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    voteToPublish(
      _cid: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}