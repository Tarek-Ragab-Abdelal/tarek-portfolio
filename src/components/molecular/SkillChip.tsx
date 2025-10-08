import Chip from "@/components/atomic/Chip";

interface SkillChipProps {
  skill: string;
  variant?: "default" | "primary" | "accent" | "outline";
}

const SkillChip = ({ skill, variant = "primary" }: SkillChipProps) => {
  return (
    <Chip variant={variant} size="md" className="hover:scale-105">
      {skill}
    </Chip>
  );
};

export default SkillChip;
