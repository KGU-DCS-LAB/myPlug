// import {} from '../components/NativeBaseComponents/Alert';
const baseUrl = '../nb/components';

type mapping = {
	title: string;
	description: string;
	basic: React.Component;
	components: {
		component: any;
		title: string;
		description: string;
	}[];
};

export const mapping = {
	Actionsheet: {
		title: 'Actionsheet',
		description: '',
		doclink: 'https://docs.nativebase.io/actionSheet',
		basic: require('./NativeBaseComponents/Actionsheet'),
		components: [
			{
				component: require('./composites/Actionsheet/Composition'),
				title: 'Composition',
				description: '',
			},
		],
	},
    Book: {
		title: 'Book',
		description: '',
		doclink: 'https://docs.nativebase.io/actionSheet',
		basic: require('./NativeBaseComponents/Actionsheet'),
		components: [
			{
				component: require('./composites/Actionsheet/Composition'),
				title: 'Composition',
				description: '',
			},
		],
	},
};