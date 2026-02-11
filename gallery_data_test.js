window.defaultContent.gallery = Array.from({length: 50}, (_, i) => ({
    category: ["sensory", "creative", "montessori", "party"][i % 4],
    src: "https://placehold.co/600x400?text=Image+" + (i + 1),
    description: "Gallery Item " + (i + 1)
}));
