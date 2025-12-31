import { defineComponent } from 'vue';
import styles from './LoadingSpinner.module.css';

export const LoadingSpinner = defineComponent({
  name: 'LoadingSpinner',
  props: {
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
    },
    fullScreen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const sizeClasses = {
      sm: 'w-6 h-6 border-2',
      md: 'w-10 h-10 border-3',
      lg: 'w-16 h-16 border-4',
    };

    return () => {
      const spinner = (
        <div class={[styles.spinner, sizeClasses[props.size as keyof typeof sizeClasses]]} />
      );

      if (props.fullScreen) {
        return <div class={styles.fullscreenOverlay}>{spinner}</div>;
      }

      return <div class={styles.inlineContainer}>{spinner}</div>;
    };
  },
});
