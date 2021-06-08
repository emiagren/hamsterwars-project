import { HamsterObject } from './HamsterInterface'

export interface ModalProps {
	content: object,
	isOpen: boolean,
	onClose: () => void;
};