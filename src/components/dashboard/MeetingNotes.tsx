import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Plus,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Link2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Decision {
  id: string;
  decision: string;
  actionOwner: string;
  linkedScheme: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: string;
  outcome?: string;
}

interface MeetingNote {
  id: string;
  meetingNumber: string;
  date: string;
  attendees: string[];
  keyDiscussions: string[];
  decisions: Decision[];
}

const meetingsData: MeetingNote[] = [
  {
    id: "52",
    meetingNumber: "52nd",
    date: "29th December 2025",
    attendees: [
      "Principal Secretary (Chair)",
      "Director Municipal Administration",
      "MD WATCO",
      "CEO OUHM",
      "FA-SB",
    ],
    keyDiscussions: [
      "Review of PMAY-U fund utilization - only 0.40% utilized",
      "Discussion on ODF++ certification progress",
      "AMRUT 2.0 tap connection coverage reaching 88%",
      "Ring Road project progress at 9%",
      "Union Finance Commission transfer at 5.65%",
    ],
    decisions: [
      {
        id: "d1",
        decision: "Expedite PMAY-U fund release to ULBs within 15 days",
        actionOwner: "CEO OUHM",
        linkedScheme: "PMAY-U",
        status: "in-progress",
        dueDate: "15th January 2026",
      },
      {
        id: "d2",
        decision: "Submit revised utilization plan for Union Finance Commission funds",
        actionOwner: "FA-SB",
        linkedScheme: "Finance Commission",
        status: "pending",
        dueDate: "10th January 2026",
      },
      {
        id: "d3",
        decision: "Fast-track ODF++ certification for 10 more cities",
        actionOwner: "DMA",
        linkedScheme: "SBM",
        status: "in-progress",
        dueDate: "31st January 2026",
      },
    ],
  },
  {
    id: "51",
    meetingNumber: "51st",
    date: "15th December 2025",
    attendees: [
      "Principal Secretary (Chair)",
      "Director Municipal Administration",
      "EIC PHEO",
      "VC BDA",
    ],
    keyDiscussions: [
      "Water meter installation progress",
      "BCPPER Vision Plan finalization",
      "Storm water drainage fund utilization",
    ],
    decisions: [
      {
        id: "d4",
        decision: "Complete water meter installation in remaining zones by Q4",
        actionOwner: "MD WATCO",
        linkedScheme: "SUJALA",
        status: "completed",
        dueDate: "31st December 2025",
        outcome: "81.64% meters installed, on track for Q4 completion",
      },
      {
        id: "d5",
        decision: "Finalize BCPPER Vision document for Cabinet approval",
        actionOwner: "VC BDA",
        linkedScheme: "BCPPER",
        status: "in-progress",
        dueDate: "15th January 2026",
      },
    ],
  },
  {
    id: "50",
    meetingNumber: "50th",
    date: "1st December 2025",
    attendees: [
      "Principal Secretary (Chair)",
      "Director Municipal Administration",
      "MD CRUT",
    ],
    keyDiscussions: [
      "Mo Bus ridership trends",
      "PM e-Bus Sewa fund utilization",
      "Liveable Cities Mission framework",
    ],
    decisions: [
      {
        id: "d6",
        decision: "Increase Mo Bus frequency on high-demand routes",
        actionOwner: "MD CRUT",
        linkedScheme: "Urban Mobility",
        status: "completed",
        dueDate: "15th December 2025",
        outcome: "Frequency increased, daily ridership up to 1.42 lakh",
      },
    ],
  },
];

const statusConfig = {
  pending: { icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
  "in-progress": { icon: AlertCircle, color: "text-blue-500", bg: "bg-blue-500/10" },
  completed: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
};

export const MeetingNotes = () => {
  const [meetings, setMeetings] = useState(meetingsData);
  const [expandedMeeting, setExpandedMeeting] = useState<string | null>("52");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newDecision, setNewDecision] = useState({
    decision: "",
    actionOwner: "",
    linkedScheme: "",
    dueDate: "",
  });

  const allDecisions = meetings.flatMap((m) => m.decisions);
  const pendingCount = allDecisions.filter((d) => d.status === "pending").length;
  const inProgressCount = allDecisions.filter((d) => d.status === "in-progress").length;
  const completedCount = allDecisions.filter((d) => d.status === "completed").length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Meetings</p>
                <p className="text-2xl font-bold">{meetings.length}</p>
              </div>
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Decisions</p>
                <p className="text-2xl font-bold text-amber-500">{pendingCount}</p>
              </div>
              <Clock className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-blue-500">{inProgressCount}</p>
              </div>
              <AlertCircle className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-500">{completedCount}</p>
              </div>
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meetings List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Dashboard Meeting Records
          </CardTitle>
          <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Decision
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Decision</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium">Decision</label>
                  <Textarea
                    placeholder="Enter the decision..."
                    value={newDecision.decision}
                    onChange={(e) =>
                      setNewDecision({ ...newDecision, decision: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Action Owner</label>
                  <Input
                    placeholder="Who is responsible?"
                    value={newDecision.actionOwner}
                    onChange={(e) =>
                      setNewDecision({ ...newDecision, actionOwner: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Linked Scheme</label>
                  <Select
                    value={newDecision.linkedScheme}
                    onValueChange={(value) =>
                      setNewDecision({ ...newDecision, linkedScheme: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PMAY-U">PMAY-U</SelectItem>
                      <SelectItem value="SBM">Swachha Bharat Mission</SelectItem>
                      <SelectItem value="SUJALA">SUJALA</SelectItem>
                      <SelectItem value="AMRUT">AMRUT 2.0</SelectItem>
                      <SelectItem value="Urban Mobility">Urban Mobility</SelectItem>
                      <SelectItem value="BCPPER">BCPPER</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Due Date</label>
                  <Input
                    type="date"
                    value={newDecision.dueDate}
                    onChange={(e) =>
                      setNewDecision({ ...newDecision, dueDate: e.target.value })
                    }
                  />
                </div>
                <Button className="w-full" onClick={() => setIsAddingNote(false)}>
                  Add Decision
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <Collapsible
                  key={meeting.id}
                  open={expandedMeeting === meeting.id}
                  onOpenChange={() =>
                    setExpandedMeeting(
                      expandedMeeting === meeting.id ? null : meeting.id
                    )
                  }
                >
                  <Card className="border-border/50">
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {expandedMeeting === meeting.id ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                            <div className="text-left">
                              <h3 className="font-semibold">
                                {meeting.meetingNumber} Dashboard Meeting
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {meeting.date}
                                <Users className="h-3 w-3 ml-2" />
                                {meeting.attendees.length} attendees
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {meeting.decisions.some((d) => d.status === "pending") && (
                              <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">
                                {meeting.decisions.filter((d) => d.status === "pending").length} Pending
                              </Badge>
                            )}
                            {meeting.decisions.some((d) => d.status === "in-progress") && (
                              <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                                {meeting.decisions.filter((d) => d.status === "in-progress").length} In Progress
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0 space-y-4">
                        {/* Key Discussions */}
                        <div>
                          <h4 className="text-sm font-medium mb-2">Key Discussions</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {meeting.keyDiscussions.map((discussion, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                {discussion}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Decisions */}
                        <div>
                          <h4 className="text-sm font-medium mb-2">Decisions & Actions</h4>
                          <div className="space-y-3">
                            {meeting.decisions.map((decision) => {
                              const config = statusConfig[decision.status];
                              const StatusIcon = config.icon;
                              return (
                                <div
                                  key={decision.id}
                                  className={`p-3 rounded-lg border ${config.bg}`}
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <StatusIcon className={`h-4 w-4 ${config.color}`} />
                                        <span className="font-medium text-sm">
                                          {decision.decision}
                                        </span>
                                      </div>
                                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                                        <span>
                                          <strong>Owner:</strong> {decision.actionOwner}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <Link2 className="h-3 w-3" />
                                          {decision.linkedScheme}
                                        </span>
                                        <span>
                                          <strong>Due:</strong> {decision.dueDate}
                                        </span>
                                      </div>
                                      {decision.outcome && (
                                        <p className="text-xs text-green-600 mt-2">
                                          <strong>Outcome:</strong> {decision.outcome}
                                        </p>
                                      )}
                                    </div>
                                    <Badge
                                      variant="outline"
                                      className={`${config.color} border-current text-xs`}
                                    >
                                      {decision.status}
                                    </Badge>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Attendees */}
                        <div>
                          <h4 className="text-sm font-medium mb-2">Attendees</h4>
                          <div className="flex flex-wrap gap-2">
                            {meeting.attendees.map((attendee, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {attendee}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
