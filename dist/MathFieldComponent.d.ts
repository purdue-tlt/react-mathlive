import 'mathlive/dist/mathlive.core.css';
import 'mathlive/dist/mathlive.css';
import * as React from 'react';
export interface Props {
    latex: string;
    onChange?: (latex: string) => void;
    onBlur?: () => void;
    onKeystroke?: (ev: KeyboardEvent) => void;
    /**
     * The raw options of mathlive's makeMathField.
     * */
    mathFieldOptions?: MathFieldConfig;
    /**
     * The mathfield object returned by makeMathField.
     */
    mathFieldRef?: (mathfield: MathField) => void;
    suppressChangeNotifications?: boolean;
}
/** A react-control that hosts a mathlive-mathfield in it. */
export declare class MathFieldComponent extends React.Component<Props> {
    private insertElement;
    private readonly combinedOptions;
    private mathField;
    constructor(props: Props);
    componentWillReceiveProps(newProps: Props): void;
    /** The domain of react ends here, so it should not render again. */
    shouldComponentUpdate(): boolean;
    render(): JSX.Element;
    componentDidMount(): void;
}
