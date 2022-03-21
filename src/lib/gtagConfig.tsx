export const GA_TRACKING_ID = 'G-H1V3329QVH';

const isObject = typeof window === 'object';

export const pageView = (url: string) => {
	if (isObject) {
		(window as any).gtag('config', GA_TRACKING_ID, {
			page_path: url,
		});
	}
};

export const event = ({ action, category, label, value }: any) => {
	if (isObject) {
		(window as any).gtag('event', action, {
			event_category: category,
			event_label: label,
			value: value,
		});
	}
};
