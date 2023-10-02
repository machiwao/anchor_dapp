import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorDapp } from "../target/types/anchor_dapp";
import { assert } from "chai";

describe("anchor_dapp", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider();
  const program = anchor.workspace.AnchorDapp as Program<AnchorDapp>;
  const keyPair = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    const greet: string = "Hello World";

    await program.methods
      .initialize(greet)
      .accounts({
        calculator: keyPair.publicKey,
        user: provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([keyPair])
      .rpc();

    const calculator = await program.account.calculator.fetch(
      keyPair.publicKey
    );

    assert.ok(calculator.greeting === greet);
  });

  it("should add", async () => {
    const num1: number = 5;
    const num2: number = 5;

    await program.methods
      .add(new anchor.BN(num1), new anchor.BN(num2))
      .accounts({
        calculator: keyPair.publicKey,
      })
      .rpc();

    const calculator = await program.account.calculator.fetch(
      keyPair.publicKey
    );

    assert.ok(calculator.result.eq(new anchor.BN(num1 + num2)));
  });
  it("should subtract", async () => {
    const num1: number = 5;
    const num2: number = 3;

    await program.methods
      .subtract(new anchor.BN(num1), new anchor.BN(num2))
      .accounts({
        calculator: keyPair.publicKey,
      })
      .rpc();

    const calculator = await program.account.calculator.fetch(
      keyPair.publicKey
    );

    assert.ok(calculator.result.eq(new anchor.BN(num1 - num2)));
  });

  it("should multiply", async () => {
    const num1: number = 3;
    const num2: number = 3;

    await program.methods
      .multiply(new anchor.BN(num1), new anchor.BN(num2))
      .accounts({
        calculator: keyPair.publicKey,
      })
      .rpc();

    const calculator = await program.account.calculator.fetch(
      keyPair.publicKey
    );

    assert.ok(calculator.result.eq(new anchor.BN(num1 * num2)));
  });

  it("should divide", async () => {
    const num1: number = 6;
    const num2: number = 3;

    await program.methods
      .divide(new anchor.BN(num1), new anchor.BN(num2))
      .accounts({
        calculator: keyPair.publicKey,
      })
      .rpc();

    const calculator = await program.account.calculator.fetch(
      keyPair.publicKey
    );

    assert.ok(calculator.result.eq(new anchor.BN(num1 / num2)));
    assert.ok(calculator.remainder.eq(new anchor.BN(num1 % num2)));
  });
});
