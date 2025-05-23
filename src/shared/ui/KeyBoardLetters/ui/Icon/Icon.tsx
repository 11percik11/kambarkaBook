interface IconProps {
    name: string;
    className?: string;
  }
  
  const icons = import.meta.glob(
    '../../../../assets/svg/*.svg', 
    { 
      eager: true, 
      query: '?url' 
    }
  );
  
  export const Icon = ({ name, className }: IconProps) => {
    const iconKey = `../../../../assets/svg/${name}_Svg.svg`;
    const iconModule = icons[iconKey] as { default: string } | undefined;
    
    if (!iconModule?.default) {
      console.warn(`Icon "${name}" not found at path: ${iconKey}`);
      return null;
    }
  
    return (
      <img 
        src={iconModule.default} 
        alt={`${name} icon`}
        className={className}
      />
    );
  };