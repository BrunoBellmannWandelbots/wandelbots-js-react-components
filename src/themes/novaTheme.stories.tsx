import { Meta, StoryObj } from "@storybook/react";
import { Color, ColorSection } from "./color";
import { useTheme } from "@mui/material";

const ColorPalette = () => {
  const theme = useTheme()

  return (
    <div
      style={{
        fontFamily: "sans-serif",
      }}
    >
      <ColorSection name="Palette">
        <Color name="Primary" color={theme.palette.primary.main} />
        <Color name="Secondary" color={theme.palette.secondary.main} />
        <Color name="Background" color={theme.palette.background.default} />
      </ColorSection>
      <ColorSection name="Text">
        <Color name="Primary" color={theme.palette.text.primary} />
        <Color name="Secondary" color={theme.palette.text.secondary} />
      </ColorSection>
      <ColorSection name="Button">
        <Color
          name="Primary Background"
          color={theme.nova.colors.buttonPrimary.background}
        />
        <Color name="Primary Text" color={theme.nova.colors.buttonPrimary.text} />
        <Color
          name="Secondary Background"
          color={theme.nova.colors.buttonSecondary.background}
        />
        <Color name="Secondary Text" color={theme.nova.colors.buttonSecondary.background} />
        <Color name="Back Background" color={theme.nova.colors.buttonBack.background} />
        <Color name="Back Text" color={theme.nova.colors.buttonBack.text} />
      </ColorSection>
      <ColorSection name="Input Field">
        <Color name="Background" color={theme.nova.colors.inputField.background} />
        <Color name="Text" color={theme.nova.colors.inputField.text} />
        <Color
          name="Unit Background"
          color={theme.nova.colors.inputField.unitBackground}
        />
        <Color name="Unit Text" color={theme.nova.colors.inputField.unitText} />
      </ColorSection>
      <ColorSection name="Sidebar">
        <Color name="Background" color={theme.nova.colors.sidebar.background} />
        <Color
          name="Background Selected"
          color={theme.nova.colors.sidebar.backgroundSelected}
        />
        <Color name="Selected" color={theme.nova.colors.sidebar.backgroundSelected} />
      </ColorSection>
    </div>
  );
};

const meta: Meta<typeof ColorPalette> = {
  component: ColorPalette,
};

export default meta;

type Story = StoryObj<typeof ColorPalette>;

export const colorPalette: Story = {};
