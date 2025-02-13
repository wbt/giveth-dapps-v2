import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { IDonationProject } from '@/apollo/types/types';

interface ISuccessDonation {
	txHash: string[];
	givBackEligible?: boolean;
}

interface IDonateContext {
	project: IDonationProject;
	isSuccessDonation?: ISuccessDonation;
	setSuccessDonation: (successDonation: ISuccessDonation) => void;
}

interface IProviderProps {
	children: ReactNode;
	project: IDonationProject;
}

const DonateContext = createContext<IDonateContext>({
	setSuccessDonation: () => {},
	project: {} as IDonationProject,
});

DonateContext.displayName = 'DonateContext';

export const DonateProvider: FC<IProviderProps> = props => {
	const { children, project } = props;

	const [isSuccessDonation, setSuccessDonation] =
		useState<ISuccessDonation>();

	return (
		<DonateContext.Provider
			value={{ project, isSuccessDonation, setSuccessDonation }}
		>
			{children}
		</DonateContext.Provider>
	);
};

export const useDonateData = () => {
	const context = useContext(DonateContext);
	if (context === undefined) {
		throw new Error('useDonateData must be used within a Provider');
	}
	return context;
};
