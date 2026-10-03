import type { RegionId } from "./regions";

// Orthopedic condition sections. ids are the future P1 slugs (promptP0.md section 10.5).
// Copy is assessment-led: no cure or outcome promises.
export type Condition = {
  id: string;
  title: string;
  concern: RegionId | "not_sure";
  what: string;
  help: string;
  approach: string;
};

export const conditions: Condition[] = [
  {
    id: "back-pain",
    title: "Back pain",
    concern: "lumbar",
    what: "Pain in the lower or upper back. It can come from muscles, joints, discs or posture.",
    help: "Physiotherapy may help when pain limits sitting, standing, walking or sleep.",
    approach:
      "We assess how you move, review any scans, then plan manual therapy, exercise and, where it suits, technology such as robotic spine decompression.",
  },
  {
    id: "disc-bulge",
    title: "Disc bulge",
    concern: "lumbar",
    what: "A disc between the bones of the spine pushes outwards and may irritate nearby nerves.",
    help: "Physiotherapy may help you manage pain and movement. Whether it suits you is decided at assessment.",
    approach:
      "We review your reports and examine you, then explain the plan. It can include manual therapy, exercise and spinal decompression.",
  },
  {
    id: "sciatica",
    title: "Sciatica",
    concern: "lumbar",
    what: "Pain that travels from the lower back through the buttock and down the leg.",
    help: "Physiotherapy may help when the pain comes from the spine or surrounding muscles.",
    approach:
      "We find the likely source, then plan treatment and exercises to ease pressure and restore movement.",
  },
  {
    id: "neck-pain",
    title: "Neck pain",
    concern: "cervical",
    what: "Pain or stiffness in the neck, sometimes with headaches or arm symptoms.",
    help: "Physiotherapy may help with pain linked to posture, desk work or joint stiffness.",
    approach:
      "We assess your neck, shoulders and posture, then plan manual therapy and exercises.",
  },
  {
    id: "tailbone-pain",
    title: "Tailbone pain",
    concern: "sacral",
    what: "Pain at the base of the spine, often worse when sitting.",
    help: "Physiotherapy may help once the cause has been assessed.",
    approach:
      "We examine the tailbone and the muscles around it, then explain treatment options.",
  },
  {
    id: "shoulder-pain",
    title: "Shoulder pain",
    concern: "joints",
    what: "Pain or stiffness when you lift, reach or sleep on the shoulder.",
    help: "Physiotherapy may help restore movement and ease pain.",
    approach:
      "We assess the shoulder and the neck and upper back, then plan treatment and exercises.",
  },
  {
    id: "knee-pain",
    title: "Knee pain",
    concern: "joints",
    what: "Pain in or around the knee, often when walking, climbing stairs or squatting.",
    help: "Physiotherapy may help with pain from overuse, injury or joint wear.",
    approach:
      "We assess how the knee, hip and foot work together, then plan strengthening and movement work.",
  },
  {
    id: "hip-pain",
    title: "Hip pain",
    concern: "joints",
    what: "Pain in the hip, groin or outer thigh, sometimes linked to the lower back.",
    help: "Physiotherapy may help once we know where the pain starts.",
    approach:
      "We assess the hip and lower back, then plan treatment and exercises.",
  },
  {
    id: "foot-ankle-pain",
    title: "Foot and ankle pain",
    concern: "joints",
    what: "Pain in the foot or ankle after injury, overuse or long periods on your feet.",
    help: "Physiotherapy may help you recover movement and strength.",
    approach:
      "We assess how you stand and walk, then plan treatment and exercises.",
  },
  {
    id: "arthritis",
    title: "Arthritis",
    concern: "joints",
    what: "Joint pain and stiffness, often worse after rest.",
    help: "Physiotherapy may help you manage pain and keep joints moving.",
    approach:
      "We assess the affected joints and plan treatment and a home exercise routine.",
  },
  {
    id: "tennis-elbow",
    title: "Tennis elbow",
    concern: "joints",
    what: "Pain on the outer side of the elbow, often after repeated gripping or typing.",
    help: "Physiotherapy may help settle pain and rebuild strength.",
    approach:
      "We assess the elbow and forearm, then plan treatment that can include shockwave therapy where it suits.",
  },
  {
    id: "post-surgery-rehab",
    title: "Post-surgery rehab, including knee replacement",
    concern: "joints",
    what: "A planned return to movement and strength after surgery such as a knee replacement.",
    help: "Rehabilitation may help you regain movement safely, alongside your surgeon's advice.",
    approach:
      "We follow your surgeon's guidance, then plan exercises and checks on your progress.",
  },
  {
    id: "sports-injury",
    title: "Sports injury",
    concern: "joints",
    what: "Muscle, tendon or joint injuries from running, gym work or sport.",
    help: "Physiotherapy may help you recover and return to activity in steps.",
    approach:
      "We assess the injury and your sport, then plan treatment and a gradual return.",
  },
  {
    id: "posture",
    title: "Posture problems",
    concern: "thoracic",
    what: "Habits like long desk hours that load the neck, upper back and lower back.",
    help: "Physiotherapy may help when posture contributes to your pain.",
    approach:
      "We assess how you sit, stand and move, then plan exercises and simple changes.",
  },
];
