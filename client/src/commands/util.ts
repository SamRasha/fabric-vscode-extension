/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/
'use strict';
import * as vscode from 'vscode';
import * as childProcessPromise from 'child-process-promise';
const exec = childProcessPromise.exec;

export class Util {

    static showConnectionQuickPickBox(prompt: string): Thenable<string | undefined> {
        const connections: Array<any> = vscode.workspace.getConfiguration().get('fabric.connections');

        const quickPickOptions = {
            ignoreFocusOut: false,
            canPickMany: false,
            placeHolder: prompt
        };

        const connectionNames: Array<string> = [];

        connections.forEach((connection) => {
            connectionNames.push(connection.name);
        });

        return vscode.window.showQuickPick(connectionNames, quickPickOptions);
    }

    static showInputBox(question: string): Thenable<string | undefined> {
        const inputBoxOptions = {
            prompt: question
        };

        return vscode.window.showInputBox(inputBoxOptions);
    }

    // Send shell command
    static async sendCommand(command: string, cwd?: string): Promise<string> {
        const result = await exec(command, {cwd: cwd});
        console.log('DEBUG: Util: printing some stdout and stderr info:');
        console.log(result.stdout);
        console.log(result.stderr);
        return result.stdout.trim();
    }
}
