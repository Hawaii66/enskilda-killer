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
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: number;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: number;
        };
        Relationships: [];
      };
      circles: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
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
            referencedRelation: "circles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kills_murderer_fkey";
            columns: ["murderer"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kills_target_fkey";
            columns: ["target"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      litigations: {
        Row: {
          created_at: string;
          id: number;
          text: string;
          user: number;
          with: number;
          witness: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          text: string;
          user: number;
          with: number;
          witness?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          text?: string;
          user?: number;
          with?: number;
          witness?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "litigations_user_fkey";
            columns: ["user"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "litigations_with_fkey";
            columns: ["with"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "litigations_witness_fkey";
            columns: ["witness"];
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
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pendingkills_target_fkey";
            columns: ["target"];
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
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "targets_target_fkey";
            columns: ["target"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          firstname: string;
          group: string;
          id: number;
          lastname: string;
          phone: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          firstname: string;
          group: string;
          id?: number;
          lastname: string;
          phone: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          firstname?: string;
          group?: string;
          id?: number;
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
            referencedRelation: "circles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "usersincircle_user_fkey";
            columns: ["user"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
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
