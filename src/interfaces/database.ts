export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string;
          email: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: number;
          name?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      circles: {
        Row: {
          color: string;
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          color?: string;
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          color?: string;
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      concepts: {
        Row: {
          concept: string;
          created_at: string;
          id: number;
          index: number;
        };
        Insert: {
          concept: string;
          created_at?: string;
          id?: number;
          index: number;
        };
        Update: {
          concept?: string;
          created_at?: string;
          id?: number;
          index?: number;
        };
        Relationships: [];
      };
      constants: {
        Row: {
          created_at: string;
          data: string;
          id: number;
          query: string;
        };
        Insert: {
          created_at?: string;
          data: string;
          id?: number;
          query: string;
        };
        Update: {
          created_at?: string;
          data?: string;
          id?: number;
          query?: string;
        };
        Relationships: [];
      };
      kills: {
        Row: {
          circle: number;
          created_at: string;
          id: number;
          murderer: number;
          target: number;
        };
        Insert: {
          circle: number;
          created_at?: string;
          id?: number;
          murderer: number;
          target: number;
        };
        Update: {
          circle?: number;
          created_at?: string;
          id?: number;
          murderer?: number;
          target?: number;
        };
        Relationships: [
          {
            foreignKeyName: "kills_circle_fkey";
            columns: ["circle"];
            isOneToOne: false;
            referencedRelation: "circles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kills_murderer_fkey";
            columns: ["murderer"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kills_target_fkey";
            columns: ["target"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      litigations: {
        Row: {
          created_at: string;
          helper: number | null;
          id: number;
          investigator: number | null;
          reason: string;
          text: string;
          user: number;
          with: number;
          witness: number | null;
        };
        Insert: {
          created_at?: string;
          helper?: number | null;
          id?: number;
          investigator?: number | null;
          reason: string;
          text: string;
          user: number;
          with: number;
          witness?: number | null;
        };
        Update: {
          created_at?: string;
          helper?: number | null;
          id?: number;
          investigator?: number | null;
          reason?: string;
          text?: string;
          user?: number;
          with?: number;
          witness?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "litigations_helper_fkey";
            columns: ["helper"];
            isOneToOne: false;
            referencedRelation: "admins";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "litigations_investigator_fkey";
            columns: ["investigator"];
            isOneToOne: false;
            referencedRelation: "admins";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "litigations_user_fkey";
            columns: ["user"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "litigations_with_fkey";
            columns: ["with"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "litigations_witness_fkey";
            columns: ["witness"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      pendingkills: {
        Row: {
          created_at: string;
          id: number;
          murderer: number;
          orderdBy: Database["public"]["Enums"]["OrderedBy"];
          target: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          murderer: number;
          orderdBy?: Database["public"]["Enums"]["OrderedBy"];
          target: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          murderer?: number;
          orderdBy?: Database["public"]["Enums"]["OrderedBy"];
          target?: number;
        };
        Relationships: [
          {
            foreignKeyName: "pendingkills_murderer_fkey";
            columns: ["murderer"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pendingkills_target_fkey";
            columns: ["target"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      posts: {
        Row: {
          created_at: string;
          header: string;
          id: number;
          image: string;
          miniheader: string;
          text: string;
        };
        Insert: {
          created_at?: string;
          header: string;
          id?: number;
          image: string;
          miniheader: string;
          text: string;
        };
        Update: {
          created_at?: string;
          header?: string;
          id?: number;
          image?: string;
          miniheader?: string;
          text?: string;
        };
        Relationships: [];
      };
      rules: {
        Row: {
          created_at: string;
          header: string;
          id: number;
          index: number;
          rule: string;
        };
        Insert: {
          created_at?: string;
          header: string;
          id?: number;
          index: number;
          rule: string;
        };
        Update: {
          created_at?: string;
          header?: string;
          id?: number;
          index?: number;
          rule?: string;
        };
        Relationships: [];
      };
      targets: {
        Row: {
          created_at: string;
          id: number;
          murderer: number;
          target: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          murderer: number;
          target: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          murderer?: number;
          target?: number;
        };
        Relationships: [
          {
            foreignKeyName: "targets_murderer_fkey";
            columns: ["murderer"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "targets_target_fkey";
            columns: ["target"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          clerkId: string;
          created_at: string;
          email: string;
          firstname: string;
          group: string;
          id: number;
          isMember: boolean;
          lastname: string;
          phone: string;
        };
        Insert: {
          clerkId?: string;
          created_at?: string;
          email: string;
          firstname: string;
          group: string;
          id?: number;
          isMember?: boolean;
          lastname: string;
          phone: string;
        };
        Update: {
          clerkId?: string;
          created_at?: string;
          email?: string;
          firstname?: string;
          group?: string;
          id?: number;
          isMember?: boolean;
          lastname?: string;
          phone?: string;
        };
        Relationships: [];
      };
      usersincircle: {
        Row: {
          circle: number;
          created_at: string;
          id: number;
          user: number;
        };
        Insert: {
          circle: number;
          created_at?: string;
          id?: number;
          user: number;
        };
        Update: {
          circle?: number;
          created_at?: string;
          id?: number;
          user?: number;
        };
        Relationships: [
          {
            foreignKeyName: "usersincircle_circle_fkey";
            columns: ["circle"];
            isOneToOne: false;
            referencedRelation: "circles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "usersincircle_user_fkey";
            columns: ["user"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      countkills: {
        Row: {
          circle: number | null;
          count: number | null;
          firstname: string | null;
          lastname: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "usersincircle_circle_fkey";
            columns: ["circle"];
            isOneToOne: false;
            referencedRelation: "circles";
            referencedColumns: ["id"];
          }
        ];
      };
      groupkills: {
        Row: {
          group: string | null;
          kills: number | null;
        };
        Relationships: [];
      };
      groupkillscircle: {
        Row: {
          circle: number | null;
          count: number | null;
          group: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "kills_circle_fkey";
            columns: ["circle"];
            isOneToOne: false;
            referencedRelation: "circles";
            referencedColumns: ["id"];
          }
        ];
      };
      killsperday: {
        Row: {
          count: number | null;
          time: string | null;
        };
        Relationships: [];
      };
      killsperdaycircle: {
        Row: {
          circle: number | null;
          count: number | null;
          time: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "kills_circle_fkey";
            columns: ["circle"];
            isOneToOne: false;
            referencedRelation: "circles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      OrderedBy: "Murderer" | "Target";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
