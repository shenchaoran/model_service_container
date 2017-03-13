﻿namespace ComputerResourceConsole
{
    partial class frm_console
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.gb_mongodb = new System.Windows.Forms.GroupBox();
            this.l_mg_status = new System.Windows.Forms.Label();
            this.l_mg_status_tag = new System.Windows.Forms.Label();
            this.bt_mg_restart = new System.Windows.Forms.Button();
            this.bt_mg_stop = new System.Windows.Forms.Button();
            this.bt_mg_start = new System.Windows.Forms.Button();
            this.gb_redis = new System.Windows.Forms.GroupBox();
            this.l_rds_status = new System.Windows.Forms.Label();
            this.l_rds_status_tag = new System.Windows.Forms.Label();
            this.bt_rds_restart = new System.Windows.Forms.Button();
            this.bt_rds_stop = new System.Windows.Forms.Button();
            this.bt_rds_start = new System.Windows.Forms.Button();
            this.gb_container = new System.Windows.Forms.GroupBox();
            this.l_ctn_status = new System.Windows.Forms.Label();
            this.l_ctn_status_tag = new System.Windows.Forms.Label();
            this.bt_ctn_restart = new System.Windows.Forms.Button();
            this.bt_ctn_stop = new System.Windows.Forms.Button();
            this.bt_ctn_start = new System.Windows.Forms.Button();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.operationToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.infoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.gb_mongodb.SuspendLayout();
            this.gb_redis.SuspendLayout();
            this.gb_container.SuspendLayout();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // gb_mongodb
            // 
            this.gb_mongodb.Controls.Add(this.l_mg_status);
            this.gb_mongodb.Controls.Add(this.l_mg_status_tag);
            this.gb_mongodb.Controls.Add(this.bt_mg_restart);
            this.gb_mongodb.Controls.Add(this.bt_mg_stop);
            this.gb_mongodb.Controls.Add(this.bt_mg_start);
            this.gb_mongodb.Location = new System.Drawing.Point(3, 30);
            this.gb_mongodb.Name = "gb_mongodb";
            this.gb_mongodb.Size = new System.Drawing.Size(300, 90);
            this.gb_mongodb.TabIndex = 0;
            this.gb_mongodb.TabStop = false;
            this.gb_mongodb.Text = "模型信息库(mongodb)";
            // 
            // l_mg_status
            // 
            this.l_mg_status.AutoSize = true;
            this.l_mg_status.Location = new System.Drawing.Point(101, 28);
            this.l_mg_status.Name = "l_mg_status";
            this.l_mg_status.Size = new System.Drawing.Size(0, 12);
            this.l_mg_status.TabIndex = 1;
            // 
            // l_mg_status_tag
            // 
            this.l_mg_status_tag.AutoSize = true;
            this.l_mg_status_tag.Location = new System.Drawing.Point(18, 28);
            this.l_mg_status_tag.Name = "l_mg_status_tag";
            this.l_mg_status_tag.Size = new System.Drawing.Size(77, 12);
            this.l_mg_status_tag.TabIndex = 1;
            this.l_mg_status_tag.Text = "数据库状态：";
            // 
            // bt_mg_restart
            // 
            this.bt_mg_restart.Location = new System.Drawing.Point(198, 55);
            this.bt_mg_restart.Name = "bt_mg_restart";
            this.bt_mg_restart.Size = new System.Drawing.Size(87, 23);
            this.bt_mg_restart.TabIndex = 0;
            this.bt_mg_restart.Text = "重启";
            this.bt_mg_restart.UseVisualStyleBackColor = true;
            this.bt_mg_restart.Click += new System.EventHandler(this.bt_mg_restart_Click);
            // 
            // bt_mg_stop
            // 
            this.bt_mg_stop.Location = new System.Drawing.Point(105, 55);
            this.bt_mg_stop.Name = "bt_mg_stop";
            this.bt_mg_stop.Size = new System.Drawing.Size(87, 23);
            this.bt_mg_stop.TabIndex = 0;
            this.bt_mg_stop.Text = "停止";
            this.bt_mg_stop.UseVisualStyleBackColor = true;
            this.bt_mg_stop.Click += new System.EventHandler(this.bt_mg_stop_Click);
            // 
            // bt_mg_start
            // 
            this.bt_mg_start.Location = new System.Drawing.Point(12, 55);
            this.bt_mg_start.Name = "bt_mg_start";
            this.bt_mg_start.Size = new System.Drawing.Size(87, 23);
            this.bt_mg_start.TabIndex = 0;
            this.bt_mg_start.Text = "启动";
            this.bt_mg_start.UseVisualStyleBackColor = true;
            this.bt_mg_start.Click += new System.EventHandler(this.bt_mg_start_Click);
            // 
            // gb_redis
            // 
            this.gb_redis.Controls.Add(this.l_rds_status);
            this.gb_redis.Controls.Add(this.l_rds_status_tag);
            this.gb_redis.Controls.Add(this.bt_rds_restart);
            this.gb_redis.Controls.Add(this.bt_rds_stop);
            this.gb_redis.Controls.Add(this.bt_rds_start);
            this.gb_redis.Location = new System.Drawing.Point(3, 126);
            this.gb_redis.Name = "gb_redis";
            this.gb_redis.Size = new System.Drawing.Size(300, 90);
            this.gb_redis.TabIndex = 0;
            this.gb_redis.TabStop = false;
            this.gb_redis.Text = "模型数据库(redis)";
            // 
            // l_rds_status
            // 
            this.l_rds_status.AutoSize = true;
            this.l_rds_status.Location = new System.Drawing.Point(101, 28);
            this.l_rds_status.Name = "l_rds_status";
            this.l_rds_status.Size = new System.Drawing.Size(0, 12);
            this.l_rds_status.TabIndex = 1;
            // 
            // l_rds_status_tag
            // 
            this.l_rds_status_tag.AutoSize = true;
            this.l_rds_status_tag.Location = new System.Drawing.Point(18, 28);
            this.l_rds_status_tag.Name = "l_rds_status_tag";
            this.l_rds_status_tag.Size = new System.Drawing.Size(77, 12);
            this.l_rds_status_tag.TabIndex = 1;
            this.l_rds_status_tag.Text = "数据库状态：";
            // 
            // bt_rds_restart
            // 
            this.bt_rds_restart.Location = new System.Drawing.Point(198, 55);
            this.bt_rds_restart.Name = "bt_rds_restart";
            this.bt_rds_restart.Size = new System.Drawing.Size(87, 23);
            this.bt_rds_restart.TabIndex = 0;
            this.bt_rds_restart.Text = "重启";
            this.bt_rds_restart.UseVisualStyleBackColor = true;
            this.bt_rds_restart.Click += new System.EventHandler(this.bt_rds_restart_Click);
            // 
            // bt_rds_stop
            // 
            this.bt_rds_stop.Location = new System.Drawing.Point(105, 55);
            this.bt_rds_stop.Name = "bt_rds_stop";
            this.bt_rds_stop.Size = new System.Drawing.Size(87, 23);
            this.bt_rds_stop.TabIndex = 0;
            this.bt_rds_stop.Text = "停止";
            this.bt_rds_stop.UseVisualStyleBackColor = true;
            this.bt_rds_stop.Click += new System.EventHandler(this.bt_rds_stop_Click);
            // 
            // bt_rds_start
            // 
            this.bt_rds_start.Location = new System.Drawing.Point(12, 55);
            this.bt_rds_start.Name = "bt_rds_start";
            this.bt_rds_start.Size = new System.Drawing.Size(87, 23);
            this.bt_rds_start.TabIndex = 0;
            this.bt_rds_start.Text = "启动";
            this.bt_rds_start.UseVisualStyleBackColor = true;
            this.bt_rds_start.Click += new System.EventHandler(this.bt_rds_start_Click);
            // 
            // gb_container
            // 
            this.gb_container.Controls.Add(this.l_ctn_status);
            this.gb_container.Controls.Add(this.l_ctn_status_tag);
            this.gb_container.Controls.Add(this.bt_ctn_restart);
            this.gb_container.Controls.Add(this.bt_ctn_stop);
            this.gb_container.Controls.Add(this.bt_ctn_start);
            this.gb_container.Location = new System.Drawing.Point(3, 222);
            this.gb_container.Name = "gb_container";
            this.gb_container.Size = new System.Drawing.Size(300, 90);
            this.gb_container.TabIndex = 0;
            this.gb_container.TabStop = false;
            this.gb_container.Text = "模型服务容器";
            // 
            // l_ctn_status
            // 
            this.l_ctn_status.AutoSize = true;
            this.l_ctn_status.Location = new System.Drawing.Point(127, 28);
            this.l_ctn_status.Name = "l_ctn_status";
            this.l_ctn_status.Size = new System.Drawing.Size(0, 12);
            this.l_ctn_status.TabIndex = 1;
            // 
            // l_ctn_status_tag
            // 
            this.l_ctn_status_tag.AutoSize = true;
            this.l_ctn_status_tag.Location = new System.Drawing.Point(18, 28);
            this.l_ctn_status_tag.Name = "l_ctn_status_tag";
            this.l_ctn_status_tag.Size = new System.Drawing.Size(113, 12);
            this.l_ctn_status_tag.TabIndex = 1;
            this.l_ctn_status_tag.Text = "模型服务容器状态：";
            // 
            // bt_ctn_restart
            // 
            this.bt_ctn_restart.Location = new System.Drawing.Point(198, 55);
            this.bt_ctn_restart.Name = "bt_ctn_restart";
            this.bt_ctn_restart.Size = new System.Drawing.Size(87, 23);
            this.bt_ctn_restart.TabIndex = 0;
            this.bt_ctn_restart.Text = "重启";
            this.bt_ctn_restart.UseVisualStyleBackColor = true;
            this.bt_ctn_restart.Click += new System.EventHandler(this.bt_ctn_restart_Click);
            // 
            // bt_ctn_stop
            // 
            this.bt_ctn_stop.Location = new System.Drawing.Point(105, 55);
            this.bt_ctn_stop.Name = "bt_ctn_stop";
            this.bt_ctn_stop.Size = new System.Drawing.Size(87, 23);
            this.bt_ctn_stop.TabIndex = 0;
            this.bt_ctn_stop.Text = "停止";
            this.bt_ctn_stop.UseVisualStyleBackColor = true;
            this.bt_ctn_stop.Click += new System.EventHandler(this.bt_ctn_stop_Click);
            // 
            // bt_ctn_start
            // 
            this.bt_ctn_start.Location = new System.Drawing.Point(12, 55);
            this.bt_ctn_start.Name = "bt_ctn_start";
            this.bt_ctn_start.Size = new System.Drawing.Size(87, 23);
            this.bt_ctn_start.TabIndex = 0;
            this.bt_ctn_start.Text = "启动";
            this.bt_ctn_start.UseVisualStyleBackColor = true;
            this.bt_ctn_start.Click += new System.EventHandler(this.bt_ctn_start_Click);
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.operationToolStripMenuItem,
            this.infoToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(307, 25);
            this.menuStrip1.TabIndex = 1;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // operationToolStripMenuItem
            // 
            this.operationToolStripMenuItem.Name = "operationToolStripMenuItem";
            this.operationToolStripMenuItem.Size = new System.Drawing.Size(44, 21);
            this.operationToolStripMenuItem.Text = "操作";
            // 
            // infoToolStripMenuItem
            // 
            this.infoToolStripMenuItem.Name = "infoToolStripMenuItem";
            this.infoToolStripMenuItem.Size = new System.Drawing.Size(44, 21);
            this.infoToolStripMenuItem.Text = "信息";
            // 
            // frm_console
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(307, 310);
            this.Controls.Add(this.gb_container);
            this.Controls.Add(this.gb_redis);
            this.Controls.Add(this.gb_mongodb);
            this.Controls.Add(this.menuStrip1);
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "frm_console";
            this.Text = "模型服务容器控制台";
            this.gb_mongodb.ResumeLayout(false);
            this.gb_mongodb.PerformLayout();
            this.gb_redis.ResumeLayout(false);
            this.gb_redis.PerformLayout();
            this.gb_container.ResumeLayout(false);
            this.gb_container.PerformLayout();
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox gb_mongodb;
        private System.Windows.Forms.Button bt_mg_start;
        private System.Windows.Forms.Label l_mg_status;
        private System.Windows.Forms.Label l_mg_status_tag;
        private System.Windows.Forms.Button bt_mg_restart;
        private System.Windows.Forms.Button bt_mg_stop;
        private System.Windows.Forms.GroupBox gb_redis;
        private System.Windows.Forms.Label l_rds_status;
        private System.Windows.Forms.Label l_rds_status_tag;
        private System.Windows.Forms.Button bt_rds_restart;
        private System.Windows.Forms.Button bt_rds_stop;
        private System.Windows.Forms.Button bt_rds_start;
        private System.Windows.Forms.GroupBox gb_container;
        private System.Windows.Forms.Label l_ctn_status;
        private System.Windows.Forms.Label l_ctn_status_tag;
        private System.Windows.Forms.Button bt_ctn_restart;
        private System.Windows.Forms.Button bt_ctn_stop;
        private System.Windows.Forms.Button bt_ctn_start;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem operationToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem infoToolStripMenuItem;
    }
}
