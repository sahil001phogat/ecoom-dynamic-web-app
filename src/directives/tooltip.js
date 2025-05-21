
export default {
  mounted(el, binding) {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-box';
    tooltip.textContent = binding.value;
    tooltip.style.position = 'absolute';
    tooltip.style.display = 'none';
    tooltip.style.padding = '5px 10px';
    tooltip.style.background = 'rgba(0,0,0,0.8)';
    tooltip.style.color = 'white';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '9999';
    tooltip.style.pointerEvents = 'none';
    
    // Add tooltip to body
    document.body.appendChild(tooltip);
    
    // Store tooltip instance on element
    el._tooltip = tooltip;
    
    // Show tooltip on mouseover
    el.addEventListener('mouseover', () => {
      const rect = el.getBoundingClientRect();
      tooltip.style.display = 'block';
      tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
      tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
    });
    
    // Hide tooltip on mouseout
    el.addEventListener('mouseout', () => {
      tooltip.style.display = 'none';
    });
  },
  
  updated(el, binding) {
    // Update tooltip text if value changes
    if (el._tooltip) {
      el._tooltip.textContent = binding.value;
    }
  },
  
  unmounted(el) {
    // Remove tooltip when element is unmounted
    if (el._tooltip) {
      document.body.removeChild(el._tooltip);
      delete el._tooltip;
    }
  }
}
