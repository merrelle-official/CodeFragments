import { onMounted, onUnmounted, ref } from "vue";

export const useDropDown = () => {
    const dropDownButton = ref<HTMLElement | null>(null);
    const dropDownMenu = ref<HTMLElement | null>(null);
    const isOpen = ref(false);
    const toggleDropDown = () => {
        isOpen.value = !isOpen.value;
    }

    const handler = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

            if (dropDownButton.value && dropDownButton.value.contains(target)) {
                toggleDropDown();
            } else if (dropDownMenu.value && !dropDownMenu.value.contains(target)) {
                isOpen.value = false;
            }
        
      };
    onMounted(() => window.addEventListener('click', handler));
    onUnmounted(() => window.removeEventListener('click', handler));

    return { 
        dropDownButton, 
        dropDownMenu, 
        isOpen 
    };
}