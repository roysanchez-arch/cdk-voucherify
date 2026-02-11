import { PurchaseCreditUseCase } from "../../application/PurchaseCreditUseCase";
import { DynamoPurchaseRepository } from "../repositories/DynamoPurchaseRepository";


export const handler = async (event: any) => {
  try {
    // Cypress debe enviar:
    // { validatedValue: number }

    const validatedValue = event.validatedValue;

    if (!validatedValue) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "validatedValue is required" })
      };
    }

    const repository = new DynamoPurchaseRepository();

    const useCase = new PurchaseCreditUseCase(repository);

    const result = await useCase.execute(validatedValue);

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };

  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" })
    };
  }
};
